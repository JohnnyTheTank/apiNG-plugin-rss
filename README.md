[logo]: http://aping.io/logo/320/aping-plugin.png "apiNG Plugin"
![apiNG][logo]

[![npm version](https://badge.fury.io/js/aping-plugin-rss.png)](https://badge.fury.io/js/aping-plugin-rss)
[![Bower version](https://badge.fury.io/bo/apiNG-plugin-rss.png)](https://badge.fury.io/bo/apiNG-plugin-rss)

**_apiNG-plugin-rss_** is a [RSS](http://cyber.law.harvard.edu/rss/rss.html) plugin for [**apiNG**](https://github.com/JohnnyTheTank/apiNG).

# Information
* **Supported apiNG models: `social`, `native` (RSS)**
* This plugin supports the [`get-native-data` parameter](https://aping.readme.io/docs/advanced#parameters)
* Used RSS->JSON parse service: `http://ajax.googleapis.com/ajax/services/feed/load`

# Documentation

1. [INSTALLATION](#1-installation)
    1. Get file
    2. Include file
    3. Add dependency
    4. Add plugin
2. [USAGE](#2-usage)
    1. Models
    2. Requests

## 1. INSTALLATION

### I. Get file
Install via either [bower](http://bower.io/), [npm](https://www.npmjs.com/), CDN (jsDelivr) or downloaded files:

* `bower install apiNG-plugin-rss --save`
* `npm install aping-plugin-rss --save`
* use [CDN file](https://www.jsdelivr.com/projects/aping.plugin-rss)
* download [apiNG-plugin-rss.zip](https://github.com/JohnnyTheTank/apiNG-plugin-rss/zipball/master)

### II. Include file
Include `aping-plugin-rss.min.js` in your apiNG application

```html
<!-- when using bower -->
<script src="bower_components/apiNG-plugin-rss/dist/aping-plugin-rss.min.js"></script>

<!-- when using npm -->
<script src="node_modules/aping-plugin-rss/dist/aping-plugin-rss.min.js"></script>


<!-- when using cdn file -->
<script src="//cdn.jsdelivr.net/aping.plugin-rss/latest/aping-plugin-rss.min.js"></script>

<!-- when using downloaded files -->
<script src="aping-plugin-rss.min.js"></script>
```

### III. Add dependency
Add the module `jtt_aping_rss` as a dependency to your app module:
```js
var app = angular.module('app', ['jtt_aping', 'jtt_aping_rss']);
```

### IV. Add the plugin
Add the plugin's directive `aping-rss="[]"` to your apiNG directive and [configure your requests](#ii-requests)
```html
<aping
    template-url="templates/social.html"
    model="social"
    items="20"
    aping-rss="[{'path':'http://blog.hackerearth.com/feed'}]">
</aping>
```

## 2. USAGE

### I. Models
Supported apiNG models

|  model   | content |
|----------|---------|
| `social` | **RSS feed** |
| `native` (RSS) | **RSS feed** |

### II. Requests
Every **apiNG plugin** expects an array of **requests** as html attribute.

#### Requests by URL
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`path`** | `http://blog.hackerearth.com/feed` | |  RSS feed url | no |
| **`items`**  | `15` | | Items per request (`0`-`n`) |  yes  |
| **`parseImage`**  | `false` | `true` | Use `true` for try to parse image from content. This parameter only works for `social` model |  yes  |

Sample requests:
* `[{'path':'http://blog.hackerearth.com/feed'}, {'path':'http://www.magazin.dtv.de/index.php/feed/'}]`
* `[{'page':'http://rss.nytimes.com/services/xml/rss/nyt/Science.xml', 'items':25}]`

# Licence
MIT

