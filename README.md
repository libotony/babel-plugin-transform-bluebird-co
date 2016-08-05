babel-plugin-transform-bluebird-co
---

replace [co](https://github.com/tj/co) with  [bluebird-co(high performace co)](https://github.com/novacrazy/bluebird-co) 、
replace [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) with  [bluebird](https://github.com/petkaantonov/bluebird#readme) plugin.

This plugin is aiming to transform base `Promise、async/await、co` to high performace `Bluebird、Bluebird.coroutine、bluebird-co`.So the suggest usage is use this plugin along with `transform-async-to-module-method`;


Installation
---
```bash
npm install bluebird bluebird-co --save
npm install babel-plugin-transform-bluebird-co transform-async-to-module-method --save-dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": [
    "transform-bluebird-co",
    [
      "transform-async-to-module-method",
      {
        "module": "bluebird-co",
        "method": "coroutine"
     }]
  ]
}
```

Development
---
Requirement global
* NodeJS v5.11.0
* Npm v3.8.6

```bash
git clone https://github.com/libotony/babel-plugin-transform-bluebird-co
cd babel-plugin-transform-bluebird-co
npm install

npm test
```
Thanks
---
[babel-plugin-transform-bluebird](https://github.com/59naga/babel-plugin-transform-bluebird)

License
---
MIT
