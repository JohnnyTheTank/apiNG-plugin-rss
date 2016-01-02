[logo]: http://aping.io/logo/320/aping-plugin.png "apiNG Plugin"
![apiNG][logo]

**_apiNG-plugin-rss_** is a [RSS](http://cyber.law.harvard.edu/rss/rss.html) plugin for [**apiNG**](https://github.com/JohnnyTheTank/apiNG).

# Information
* **Supported apiNG models: `social`, `native` (RSS)**
* Used RSS->JSON parse service: `http://ajax.googleapis.com/ajax/services/feed/load`

# Documentation
    I.  INSTALLATION
    II. USAGE

## I. INSTALLATION
    a) Get files
    b) Include files
    c) Add dependencies
    d) Add the plugin

### a) Get files
You can choose your preferred method of installation:

* Via bower: `bower install apiNG-plugin-rss --save`
* Download from github: [apiNG-plugin-rss.zip](https://github.com/JohnnyTheTank/apiNG-plugin-rss/zipball/master)

### b) Include files
Include `apiNG-plugin-rss.min.js` in your apiNG application
```html
<script src="bower_components/apiNG-plugin-rss/dist/apiNG-plugin-rss.min.js"></script>
```

### c) Add dependencies
Add the module `jtt_aping_rss` as a dependency to your app module:
```js
var app = angular.module('app', ['jtt_aping', 'jtt_aping_rss']);
```

### d) Add the plugin
Add the plugin's directive `aping-rss="[]"` to your apiNG directive and configure your requests (_**II. USAGE**_)
```html
<aping
    template-url="templates/social.html"
    model="social"
    items="20"
    aping-rss="[{'path':'http://blog.hackerearth.com/feed'}]">
</aping>
```

## II. USAGE
    a) Models
    b) Requests

### a) Models
Supported apiNG models

|  model   | content |
|----------|---------|
| `social` | **RSS feed** |
| `native` (RSS) | **RSS feed** |


### b) Requests
Every **apiNG plugin** expects an array of **requests** as html attribute.

#### Requests by URL
|  parameter  | sample | description | optional |
|----------|---------|---------|---------|
| **`path`** | `http://blog.hackerearth.com/feed` | RSS feed url | no |
| **`items`**  | `15` | Items per request (`0`-`n`) |  yes  |

Sample requests:
* `[{'path':'http://blog.hackerearth.com/feed'}, {'path':'http://www.magazin.dtv.de/index.php/feed/'}]`
* `[{'page':'http://rss.nytimes.com/services/xml/rss/nyt/Science.xml', 'items':25}]`

# Licence
MIT

