<template>
  <div id="app">
    <div id="capture">
      <div :class="myClass" :style="`font-size: ${fontSize};`">
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
      Size:
      <input
        type="number"
        min="8"
        max="128"
        v-model="fontSizeByPixel"
        @change="changeFontSize"
      />
    </label>
    <a id="download-link" @click="down">Download</a>
    <img style="visibility:hidden;" :src="output" id="outputimg" />
  </div>
</template>

<script>
// import html2canvas from "html2canvas";
export default {
  name: "App",
  data() {
    return {
      myText: "",
      fontSizeByPixel: 36,
      fontSize: 36,
      fontFamily: "serif",
      isBold: false,
      isItalic: false,
      output: null,
      myClass: {},
    };
  },
  head: {
    link: {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/water.css@2/out/light.min.css",
    },
  },
  methods: {
    async toggleItalic() {
      this.isItalic = !this.isItalic;
      this.drawTextToCanvas();
    },
    async toggleBold() {
      this.isBold = !this.isBold;
      this.drawTextToCanvas();
    },
    async changeFontSize(){
      this.fontSize = `${this.fontSizeByPixel}px`
      this.drawTextToCanvas();
    },
    async drawTextToCanvas() {
      this.myClass = {
        bold: this.isBold,
        italic: this.isItalic,
      };

      const el = document.getElementById("capture");
      const options = {
        type: "dataURL",
      };
      this.output = await this.$html2canvas(el, options);
    },
    down(){
      const a = document.getElementById("download-link")
      const im = document.getElementById("outputimg")
      a.href = im.getAttribute("src")
      a.download = `${new Date().getTime()}.png` 
    }
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
  width: 250px;
  height: 50px;
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

#download-link{
  color: #009;
}
</style>
