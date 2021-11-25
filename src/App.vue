<template>
  <div id="app">
    <div id="capture">
      <div :style="myStyles">
        {{ myText.length == 0 ? " " : myText }}
      </div>
    </div>
    <textarea
      type="text"
      class="myText"
      v-model="myText"
      @keyup="drawTextToCanvas"
    />
    <label>
      Front-Color:
      <input type="color" @click="changeColor" v-model="frontColor" />
    </label>
    <label>
      BG-Color:
      <input type="color" @click="changeBGColor" v-model="BGColor" />
    </label>
    <label>
      Size:
      <input
        type="number"
        min="8"
        max="128"
        v-model="fontSizeByPixel"
        @change="changeFontSize"
      />
    </label>
    <label>
      Bold:
      <input
        type="checkbox"
        :checked="isBold ? 'checked' : ''"
        @click="toggleBold"
      />
    </label>
    <label>
      Italic:
      <input
        type="checkbox"
        :checked="isItalic ? 'checked' : ''"
        @click="toggleItalic"
      />
    </label>

    <label>
      Stretch:
      <input
        type="number"
        min="50"
        max="200"
        v-model="stretch"
        @change="changeWidth"
      />
    </label>

    <label>
      Width:
      <input
        type="number"
        min="50"
        max="500"
        v-model="width"
        @change="changeWidth"
      />
    </label>
    <label>
      Height:
      <input
        type="number"
        min="50"
        max="500"
        v-model="height"
        @change="changeHeight"
      />
    </label>
    <label>
      Align:
      <select v-model="textAlign" @change="changeAlign">
        <option value="start">Left</option>
        <option value="center" selected>Center</option>
        <option value="end">Right</option>
      </select>
    </label>

    <label>
      Shadow-X:
      <input
        type="number"
        min="0"
        max="10"
        v-model="shadowX"
        @change="changeHeight"
      />
    </label>
    <label>
      Shadow-Y:
      <input
        type="number"
        min="0"
        max="10"
        v-model="shadowY"
        @change="changeHeight"
      />
    </label>
    <label>
      Shadow-Blur:
      <input
        type="number"
        min="0"
        max="25"
        v-model="shadowB"
        @change="changeHeight"
      />
    </label>

    <a id="download-link" @click="down">Download</a>
    <div style="width: 250px; height: 50px">
      <img style="visibility: hidden" :src="output" id="outputimg" />
    </div>
  </div>
</template>

<script>
// import html2canvas from "html2canvas";
export default {
  name: "App",
  data() {
    return {
      myText: "My Service",
      fontSizeByPixel: 36,
      fontSize: "36px",
      fontFamily: "sans-serif",
      isBold: true,
      isItalic: false,
      stretch: 100,
      textAlign: "center",
      frontColor: "#ffffff",
      BGColor: "#3333BB",
      shadowX: 3,
      shadowY: 3,
      shadowB: 10,
      padding: 5,
      width: 250,
      height: 75,
      output: null,
    };
  },
  computed: {
    myStyles() {
      return {
        fontWeight: this.isBold ? "bold" : "normal",
        fontStyle: this.isItalic ? "italic" : "normal",
        fontSize: this.fontSize,
        color: this.frontColor,
        backgroundColor: this.BGColor,
        width: `${this.width}px`,
        textAlign: this.textAlign,
        height: `${this.height}px`,
        display: "flex",
        justifyContent: this.textAlign,
        padding: `${this.padding}px`,
        alignItems: "center",
        boxSizing: "border-box",
        fontStretch: `${this.stretch}%`,
        textShadow: `${this.shadowX}px ${this.shadowY}px ${this.shadowB}px ${this.frontColor}`,
      };
    },
  },
  head: {
    link: {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/water.css@2/out/light.min.css",
    },
  },
  methods: {
    async changeBGColor() {
      this.drawTextToCanvas();
    },
    async changeColor() {
      this.drawTextToCanvas();
    },
    async changeAlign() {
      this.drawTextToCanvas();
    },
    async changeWidth() {
      this.drawTextToCanvas();
    },
    async changeHeight() {
      this.drawTextToCanvas();
    },
    async toggleItalic() {
      this.isItalic = !this.isItalic;
      this.drawTextToCanvas();
    },
    async toggleBold() {
      this.isBold = !this.isBold;
      this.drawTextToCanvas();
    },
    async changeFontSize() {
      this.fontSize = `${this.fontSizeByPixel}px`;
      this.drawTextToCanvas();
    },
    async drawTextToCanvas() {
      const el = document.getElementById("capture");
      const options = {
        type: "dataURL",
      };
      this.output = await this.$html2canvas(el, options);
    },
    down() {
      const a = document.getElementById("download-link");
      const im = document.getElementById("outputimg");
      a.href = im.getAttribute("src");
      a.download = `${new Date().getTime()}.png`;
    },
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.myText {
  width: 250px;
  height: 50px;
  text-align: center;
}
#capture {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border: 1px solid #ccc;
}
.bold {
  font-weight: bold;
}
.italic {
  font-style: italic;
}

#download-link {
  color: #009;
}
</style>
