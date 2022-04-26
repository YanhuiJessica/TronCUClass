<p align="center"><img width="100" alt="CUC Tronclass Courseware Downloader" src="img/tronclass-dl.jpg"></p>
<p align="center">CUC 畅课（TronClass） <strong>课件下载</strong> 浏览器插件</p>

<p align="center"><a rel="noreferrer noopener" href="https://chrome.google.com/webstore/detail/troncuclass/oekepilgaknaenpkamkpiigfndkjlmil"><img alt="Chrome Web Store" src="https://img.shields.io/badge/Chrome-141e24.svg?&style=for-the-badge&logo=google-chrome&logoColor=white&color=04acbd"></a>  <img alt="Firefox Add-ons" src="https://img.shields.io/badge/Firefox-141e24.svg?&style=for-the-badge&logo=firefox-browser&logoColor=white&color=04acbd">

<h2 align="center">TronCUClass</h2>

<p align="center">TronCUClass 支持 <strong>CUC</strong> 畅课平台上任意格式的课件下载。成功开始下载的非视频类课件，其对应在畅课平台上的进度将自动标记为已完成。</p>

## Install

- Chrome 用户可正常通过 [应用商店](https://chrome.google.com/webstore/detail/troncuclass/oekepilgaknaenpkamkpiigfndkjlmil) 进行下载安装
- Firefox 用户需在 [Releases](https://github.com/YanhuiJessica/TronCUClass/releases) 界面下选择合适的版本，点击对应版本附件中的 `xpi` 文件，将自动下载并提示安装，后续更新默认由浏览器完成（或选择手动更新）

## Dev

- 开发环境初始化

    ```bash
    git clone https://github.com/YanhuiJessica/TronCUClass.git
    cd TronCUClass/
    npm install
    ```

- 根据当前使用浏览器的不同，将 `public` 目录下的 `manifest.json.chrome` 或 `manifest.json.firefox` 的文件名修改为 `manifest.json`
- 在项目根目录执行：`npm run build`