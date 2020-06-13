<template>
  <div class="display-area">
    <div v-for="(row, r) in height" :key="r">
      <div v-for="(cell, c) in width" :key="c">
        <div
          :class="[
            'cell',
            {
              'is-selected-cell': isSelectedCell(r, c),
              'is-bottom-cell': r === height - 1,
              'is-right-cell': c === width - 1,
              'is-clear-cell': isClearCell(r, c),
              'is-error-cell': isErrorCell(r, c),
              'has-queen': hasQueen(r, c)
            }
          ]"
          :style="{
            top: cellTop(r, c),
            left: cellLeft(r, c)
          }"
          @click="onClicked(r, c)"
        >
          <div class="inner-cell">
            <div v-if="hasQueen(r, c)">
              <SvgQueen style="width: 100%; height: 100%" />
            </div>
          </div>
          <div v-if="hasBeam(r, c, 2)">
            <div class="inner-point up"></div>
          </div>
          <div v-if="hasBeam(r, c, 3)">
            <div class="inner-point right"></div>
          </div>
          <div v-if="hasBeam(r, c, 0)">
            <div class="inner-point down"></div>
          </div>
          <div v-if="hasBeam(r, c, 1)">
            <div class="inner-point left"></div>
          </div>
          <div v-if="hasBeam(r, c, 6)">
            <div class="inner-point up-right"></div>
          </div>
          <div v-if="hasBeam(r, c, 7)">
            <div class="inner-point down-right"></div>
          </div>
          <div v-if="hasBeam(r, c, 4)">
            <div class="inner-point down-left"></div>
          </div>
          <div v-if="hasBeam(r, c, 5)">
            <div class="inner-point up-left"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SvgQueen from '@/assets/svg/queen.svg'

export default {
  components: {
    SvgQueen
  },
  data() {
    return {
      keydown: false,
      cellHeight: 60,
      cellWidth: 60
    }
  },
  computed: {
    ...mapState([
      'grid',
      'gridStatus',
      'gridBeam',
      'height',
      'width',
      'selectedRow',
      'selectedColumn'
    ])
  },
  mounted() {
    // キーイベントの登録
    window.addEventListener('keyup', this.onKeyUp, false)
    window.addEventListener('keydown', this.onKeyDown, false)
  },
  destroyed() {
    window.removeEventListener('keyup', this.onKeyUp, false)
    window.removeEventListener('keydown', this.onKeyDown, false)
  },
  created() {
    this.initialize()
  },
  methods: {
    ...mapMutations([
      'moveCell',
      'changeCell',
      'resetGrid',
      'selectCell',
      'initialize'
    ]),
    cellTop(r, c) {
      return r * this.cellHeight + 'px'
    },
    cellLeft(r, c) {
      return c * this.cellWidth + 'px'
    },
    isSelectedCell(r, c) {
      return r === this.selectedRow && c === this.selectedColumn
    },
    isErrorCell(r, c) {
      return this.gridStatus[r][c] === 1
    },
    isClearCell(r, c) {
      return this.gridStatus[r][c] === 2
    },
    hasQueen(r, c) {
      return this.grid[r][c] === 1
    },
    hasBeam(r, c, d) {
      return this.gridBeam[r][c][d] === 1
    },
    keyDown(key, code) {
      // 値の変更
      const arrayEnter = ['Enter']
      const index = arrayEnter.indexOf(code)
      if (index !== -1) {
        this.changeCell()
      }

      // カーソルの移動
      const arrayArrow = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp']
      const indexArrow = arrayArrow.indexOf(code)
      if (indexArrow !== -1) {
        const dys = [0, 1, 0, -1]
        const dxs = [1, 0, -1, 0]
        this.moveCell({ dy: dys[indexArrow], dx: dxs[indexArrow] })
      }

      // リセット
      const arrayEsc = ['Escape']
      const indexEsc = arrayEsc.indexOf(code)
      if (indexEsc !== -1) {
        this.resetGrid()
      }
    },
    onClicked(r, c) {
      this.selectCell({ r, c })
      this.changeCell()
    },
    onKeyDown(event) {
      if (!this.keydown) {
        this.keydown = true
        // console.log(`key: ${event.key}, code: ${event.code}`)
        this.keyDown(event.key, event.code)
      }
    },
    onKeyUp(event) {
      this.keydown = false
    }
  }
}
</script>

<style>
.display-area {
  width: 480px;
  height: 480px;
  /* border: 1px solid black; */
  margin-bottom: 15px;
  position: relative;
}

.cell {
  width: 60px;
  height: 60px;
  position: absolute;
  border-left: 1px solid gray;
  border-top: 1px solid gray;
  z-index: auto;
}

.cell.is-bottom-cell {
  border-bottom: 1px solid gray;
}

.cell.is-right-cell {
  border-right: 1px solid gray;
}

.cell.is-clear-cell {
  background-color: #00d1b2;
}

.cell.is-error-cell {
  background-color: #ff3860;
}

.cell.is-selected-cell {
  outline: 3px solid #363636;
  z-index: 1;
}

.inner-cell {
  width: 70%;
  height: 70%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner-point {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
  opacity: 0.5;
  z-index: 1;
}

.inner-point.up {
  top: 0;
  left: 50%;
  width: 12%;
  height: 12%;
  transform: translate(-50%, 0%);
}
.inner-point.right {
  top: 50%;
  left: 89%;
  width: 12%;
  height: 12%;
  transform: translate(0%, -50%);
}
.inner-point.down {
  top: 88%;
  left: 50%;
  width: 12%;
  height: 12%;
  transform: translate(-50%, 0%);
}
.inner-point.left {
  top: 50%;
  left: 0;
  width: 12%;
  height: 12%;
  transform: translate(0%, -50%);
}

.inner-point.up-right {
  top: 0;
  left: 89%;
  width: 12%;
  height: 12%;
}
.inner-point.down-right {
  top: 88%;
  left: 89%;
  width: 12%;
  height: 12%;
}
.inner-point.down-left {
  top: 88%;
  left: 0;
  width: 12%;
  height: 12%;
}
.inner-point.up-left {
  top: 0;
  left: 0;
  width: 12%;
  height: 12%;
}
</style>
