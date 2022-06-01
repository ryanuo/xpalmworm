<template>
  <div class="home">
    <el-container>
      <el-header>
        <db-header></db-header>
      </el-header>
      <el-container>
        <el-aside :width="'200px'" class="aside-con">
          <div class="author_w">
            <img src="image/page/author.png" alt="掌虫后台" />
            <span>掌虫后台</span>
          </div>
          <el-menu :default-active="ispathActive" class="el-menu-vertical-demo" :collapse-transition="false"
            @open="handleOpen" @close="handleClose" router>
            <el-menu-item v-for="item in menuList" :key="item.id" :index="'/' + item.path" :title="item.authname"
              @click="pathActive('/' + item.path)">
              <template #title>
                <img class="img_w" :src="
                  'image/icon/' +
                  (ispathActive == '/' + item.path ?
                    item.path + '_' : item.path) + '.png'
                " :alt="item.authname" />
                <span class="_isactive">{{ item.authname }}</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="el-c">
          <el-card>
            <router-view></router-view>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { menuList } from "@/utils/samll/menuList";
// import debounce_merge from "@/utils/debounce";
import DbHeader from "@/components/header/DbHeader.vue";
export default {
  name: "Home",
  components: {
    DbHeader,
  },
  setup() {
    // let isCollapsed = ref(false)
    const judgeTime = () => {
      const t = new Date();
      const h = t.getHours();
      if (h > 20 && h > 0 && h < 7) {
        changeSkin("dark");
      }
    };
    judgeTime();
    // type为night或者day
    const changeSkin = (type: string): void => {
      // 节流防止疯狂点击
      let change = null;
      if (change) {
        clearTimeout(change);
      }
      change = setTimeout(() => {
        document.head
          .querySelector("#skin")!
          .setAttribute("href", `./css/theme/${type}.css`);
      }, 100);
    };
    const handleOpen = function () { };
    const handleClose = function () { };
    // 点击跳转
    let ispathActive = ref<string>("/home");
    const pathActive = function (path: string) {
      sessionStorage.setItem("ispathActive", path);
      ispathActive.value = path;
    };
    // 当页面打开时判断选中的状态
    const getActive = function () {
      const isActive = sessionStorage.getItem("ispathActive");
      if (isActive) return (ispathActive.value = isActive);
    };
    getActive();
    return {
      changeSkin,
      menuList,
      // isCollapsed,
      handleOpen,
      handleClose,
      pathActive,
      ispathActive,
    };
  },
};
</script>
<style lang="scss" scoped>
.el-c {
  padding: 18px 10px 18px 0;
}

.el-header {
  width: 100%;
  background-color: var(--skinColor);
  box-shadow: 0 0 5px 8px rgba($color: var(--boxShadow), $alpha: 0.7);
}

.el-aside {
  // height: 100vh;
  overflow: hidden;
}

.el-menu {
  width: 100%;
  background: transparent;
  margin-left: 20px;
}

.aside-con {

  // background-color: var(--skinColor);
  @media only screen and (max-width: 800px) {
    display: none;
  }

  .el-menu {
    border-right: none;
  }

  .isCollapsed {
    text-align: center;
    line-height: 24px;
    color: var(--themeColor);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    // background-color: var(--skinColor);
  }
}

.el-menu-item {
  margin: 10px 0;
}

.img_w {
  width: 15%;
  margin-right: 10px;
}

// 点击后的样式状态
.is-active {
  background-color: var(--skinColor);
  border-radius: 10px 0 0 10px;
  color: var(--themeColor);
}

.author_w {
  text-align: center;
  padding: 18px 0;
  cursor: pointer;

  img {
    width: 24%;
    vertical-align: middle;
    border-radius: 50%;
    margin-right: 10px;
  }

  span {
    color: var(--fontColor);
    font-weight: 550;
    vertical-align: middle;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
}

._isactive {
  color: var(--fontColor);
}
</style>>