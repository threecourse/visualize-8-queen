<template>
  <div>
    <div class="is-size-4">
      概要
    </div>
    <div class="pt-2">
      <a
        href="https://ja.wikipedia.org/wiki/%E3%82%A8%E3%82%A4%E3%83%88%E3%83%BB%E3%82%AF%E3%82%A4%E3%83%BC%E3%83%B3"
        >エイト・クイーン問題</a
      >を解いて下さい
    </div>
    <div class="is-size-4 pt-4">
      操作方法
    </div>
    <div class="pt-2">
      キーボード：
    </div>
    <div class="content my-0">
      <ul class="mt-1">
        <li>矢印キーでグリッドの移動</li>
        <li>Enterキーでクイーンの配置／解除</li>
        <li>Escキーでリセット</li>
      </ul>
    </div>
    <div class="pt-3">
      マウス：
    </div>
    <div>
      マウスのクリックでもクイーンの配置・解除ができます。
    </div>
    <div class="pt-3">
      ボタン：
    </div>
    <div>
      以下のボタンでも操作ができます
    </div>
    <div class="pt-2">
      <div class="button-area">
        <div class="button button-left" @click="moveCell({ dy: 0, dx: -1 })">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="button button-up" @click="moveCell({ dy: -1, dx: 0 })">
          <i class="fas fa-arrow-up"></i>
        </div>
        <div class="button button-right" @click="moveCell({ dy: 0, dx: 1 })">
          <i class="fas fa-arrow-right"></i>
        </div>
        <div class="button button-down" @click="moveCell({ dy: 1, dx: 0 })">
          <i class="fas fa-arrow-down"></i>
        </div>
        <div class="button button-place" @click="changeCell">
          配置／解除
        </div>
      </div>
    </div>
    <div class="pt-1">
      <a class="button is-info" @click="resetGrid">リセット</a>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['moveCell', 'changeCell', 'resetGrid'])
  }
}
</script>

<style>
.button-area {
  width: 320px;
  height: 120px;
  position: relative;
  /* border: 1px solid black; */
}

.button-left {
  position: absolute;
  top: 40px;
  left: 10px;
}

.button-right {
  position: absolute;
  top: 40px;
  left: 120px;
}

.button-down {
  position: absolute;
  top: 70px;
  left: 65px;
}

.button-up {
  position: absolute;
  top: 10px;
  left: 65px;
}

.button-place {
  position: absolute;
  top: 40px;
  left: 185px;
}
</style>
