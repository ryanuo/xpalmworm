# 导入数据库模块
import json, datetime
# 导入前台请求的request模块
from flask import request, Flask, render_template
from werkzeug.datastructures import ImmutableMultiDict
from cloud.email_active import activeUser  # 邮箱请求
from connect import MysqlHelper
from cloud.db_config import Cloud

# 传递根目录
app = Flask(__name__, template_folder='templates', static_folder='')
self = {
    'host': 'localhost',
    'port': 3306,
    'db': 'wxmydb',
    'user': 'root',
    'password': "root123",
    'charset': 'utf8'
}


# 默认路径访问登录页面
@app.route('/')
def index():
    return render_template('index.html')


# 请求api地址的定义
# 登录的地址
@app.route('/api', methods=['POST', 'GET'])
def api_list():
    if request.method == 'GET':
        email = request.args.get('email')
        psw = request.args.get('password')
        sql = "SELECT * FROM db_user WHERE email=%s and password=%s"
        status = MysqlHelper(self).cud(sql, [email, psw])
        if status['status_code'] == 1:
            data_res = {
                "msg": "登录成功",
                "status_code": status['status_code'],
                "data": {
                    "user_id": status['data'][0],
                    "username": status['data'][1],
                    "email": status['data'][3],
                    "sex": status['data'][4],
                    "role": status['data'][6],
                    "create_time": str(status['data'][5]),
                }
            }
            if status['data'][7] == '0':
                return json.dumps({"msg": "账户未激活,请重新激活,已发送至您的邮箱,点击邮箱中激活按钮激活信息", "status_code": -2})
            elif status['data'][7] == '1':
                return json.dumps(data_res, ensure_ascii=False)
        else:
            return json.dumps({"msg": "登录失败", "status_code": -1}, ensure_ascii=False)
    elif request.method == 'POST':
        try:
            if request.content_type.startswith('application/json'):
                comment = request.get_json()['data']
                # comment = request.json.to_dict()
                # print(comment['data'])
            elif request.content_type.startswith('multipart/form-data'):
                comment = request.form.to_dict()
            else:
                comment = request.values.to_dict()
                print(comment)
        except:
            return json.dumps({"msg": "注册参数有误", "status_code": -1}, ensure_ascii=False)
        else:
            dt = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            # 判断是否已存在，如果存在则无法插入
            sql = '''
                INSERT INTO db_user ( username, email, password, role, create_time )
                SELECT	%s, %s, %s, %s, %s
                FROM DUAL
                WHERE
                    NOT EXISTS (SELECT username FROM db_user WHERE username = %s or email = %s);
            '''
            status = MysqlHelper(self).cud(sql,
                                           [comment['username'], comment['email'], comment['password'], comment['role'],
                                            dt, comment['username'], comment['email']])
            print(status)
            if status['status_code'] == 1:
                data_res = {
                    "msg": "注册成功",
                    "status_code": status['status_code'],
                    "data": status
                }
                return json.dumps(data_res, ensure_ascii=False)
            else:
                return json.dumps({"msg": "用户名或者邮箱已重复", "status_code": -1}, ensure_ascii=False)


# 用户账户的激活
@app.route('/isactive', methods=['POST', "GET", "PUT"])
def isActive():
    if request.method == 'GET':
        msg = request.args.to_dict()
        sql = '''
        UPDATE db_user SET isactive = %s
        WHERE email = %s and password=%s and isactive= %s
        '''
        status = MysqlHelper(self).cud(sql,
                                       ('1', msg['email'], msg['password'], '0'))
        if status['status_code'] == 1:
            return json.dumps({'msg': "您的账户已激活", 'status_code': 1})
        elif status['status_code'] == 0:
            return json.dumps({'msg': "请不要重复激活", 'status_code': 0})
    elif request.method == 'PUT':
        if request.content_type.startswith('application/json'):
            comment = request.get_json()
        elif request.content_type.startswith('multipart/form-data'):
            comment = request.form.to_dict()
        else:
            comment = request.values.to_dict()
        activeUser(comment)
        return json.dumps({'msg': "验证信息已发送", 'status_code': 1})


# 获取新闻数据
@app.route('/news', methods=['POST', "GET", 'DELETE'])
def news_list():
    # 资讯获取
    if request.method == 'GET':
        # p = request.args.to_dict()
        key = request.args.get('key')
        pagesize = request.args.get('pagesize')
        pagenum = request.args.get('pagenum')
        if not key:
            return json.dumps({"msg": '参数有误', "status_code": -1})
        # print(ImmutableMultiDict(request.args).to_dict())
        return Cloud(key).databaseQuery(pagenum, pagesize)
    # 增加数据
    elif request.method == 'POST':
        return json.dumps({"msg": "当前为Post请求", "status_code": 2}, ensure_ascii=False)
    # 新闻删除操作
    elif request.method == 'DELETE':
        try:
            content = request.get_json()
            # print(ImmutableMultiDict(request.args).to_dict())
            sql = "db.collection('%s').doc('%s').remove()" % (content['key'], content['_id'])
            return Cloud(content['key']).databaseRemove(sql)
        except:
            return json.dumps({'msg': "删除失败", "status_code": -4})
    elif request.method == 'POST':
        return json.dumps({"msg": "当前为Post请求", "status_code": 2}, ensure_ascii=False)


# 积分展示
@app.route('/rank', methods=['POST', "GET"])
def rank_():
    if request.method == 'GET':
        s = request.args.get('key')
        pagesize = request.args.get('pagesize')
        pagenum = request.args.get('pagenum')
        if not s:
            return json.dumps({"msg": '参数有误', "status_code": -1})
        # print(ImmutableMultiDict(request.args).to_dict())
        # 加密返回_openid
        return Cloud('ranking_sort').databaseQuery(pagenum, pagesize, True)
    elif request.method == 'POST':
        return json.dumps({"msg": "当前为Post请求", "status_code": 2}, ensure_ascii=False)


# 登录请求
@app.route('/login', methods=['POST', 'GET'])
def login_user():
    # 查询数据库
    return json.dumps({"msg": "登录成功", "status_code": 1})


# 按间距中的绿色按钮以运行脚本。
if __name__ == '__main__':
    app.run(debug=True)
