import pymysql
class MysqlHelper():
    def __init__(self, args):
        self.host = args['host']
        self.port = args['port']
        self.db = args['db']
        self.user = args['user']
        self.password = args['password']
        self.charset = args['charset']

    def open(self):
        # 连接数据库
        self.conn = pymysql.connect(host=self.host, port=self.port, db=self.db,
                                    user=self.user, passwd=self.password, charset=self.charset)
        # 创建游标对象
        self.cursor = self.conn.cursor()

    # 关闭
    def close(self):
        self.cursor.close()
        self.conn.close()

    # 增加、修改、删除命令语句
    def cud(self, sql, params, msg="操作成功"):
        try:
            self.open()
            # 处理逻辑数据，传入sql语句以及参数化
            state = self.cursor.execute(sql, params)
            ret = self.cursor.fetchone()
            # 执行事务
            self.conn.commit()
            self.close()
            print(msg)
            # 这样可以修改输出的操作成功信息提示
            return {
                "msg": msg,
                "status_code": state,
                "data": ret
            }
        except Exception as e:
            self.conn.rollback()
            print("错误", e)

    # 查询所有数据,多个值
    def all(self, sql, params=()):
        try:
            self.open()
            self.cursor.execute(sql, params)
            data = self.cursor.fetchall()
            self.close()
            return data
        except Exception as e:
            print("错误", e)