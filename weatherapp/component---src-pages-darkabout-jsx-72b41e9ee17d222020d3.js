(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{149:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(163),o=n(151),u=(n(73),function(e){var t=e.children;return r.a.createElement(o.StaticQuery,{query:"3014072087",render:function(e){return r.a.createElement("div",null,r.a.createElement(o.Link,{to:"/",style:{float:"right"}},"Home"),t,r.a.createElement("h3",null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("h3",null,"Currently Summary: ",e.weatherData.currently.summary)),r.a.createElement("li",null,r.a.createElement("h3",null,"cloudCover: ",e.weatherData.currently.cloudCover)),r.a.createElement("li",null,r.a.createElement("h3",null,"latitude: ",e.weatherData.latitude)),r.a.createElement("li",null,r.a.createElement("h3",null,"longitude: ",e.weatherData.longitude)))))},data:i})});n.d(t,"query",function(){return l});var l="1097489062";t.default=function(e){var t=e.data;return r.a.createElement(u,null,r.a.createElement("h1",null,"About ",t.site.siteMetadata.title),r.a.createElement("p",null,"Using DarkSky as the weather data source."))}},150:function(e,t,n){"use strict";var a=n(8);t.__esModule=!0,t.withPrefix=f,t.navigateTo=t.replace=t.push=t.navigate=t.default=void 0;var r=a(n(153)),i=a(n(154)),o=a(n(7)),u=a(n(52)),l=a(n(53)),s=a(n(4)),c=a(n(0)),d=n(16),p=n(151);function f(e){return function(e){return e.replace(/\/+/g,"/")}("/"+e)}var h={activeClassName:s.default.string,activeStyle:s.default.object},v=function(e){function t(t){var n;n=e.call(this,t)||this,(0,l.default)((0,u.default)((0,u.default)(n)),"defaultGetProps",function(e){return e.isCurrent?{className:[n.props.className,n.props.activeClassName].filter(Boolean).join(" "),style:(0,i.default)({},n.props.style,n.props.activeStyle)}:null});var a=!1;return"undefined"!=typeof window&&window.IntersectionObserver&&(a=!0),n.state={IOSupported:a},n.handleRef=n.handleRef.bind((0,u.default)((0,u.default)(n))),n}(0,o.default)(t,e);var n=t.prototype;return n.componentDidUpdate=function(e,t){this.props.to===e.to||this.state.IOSupported||___loader.enqueue((0,p.parsePath)(this.props.to).pathname)},n.componentDidMount=function(){this.state.IOSupported||___loader.enqueue((0,p.parsePath)(this.props.to).pathname)},n.handleRef=function(e){var t,n,a,r=this;this.props.innerRef&&this.props.innerRef(e),this.state.IOSupported&&e&&(t=e,n=function(){___loader.enqueue((0,p.parsePath)(r.props.to).pathname)},(a=new window.IntersectionObserver(function(e){e.forEach(function(e){t===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(a.unobserve(t),a.disconnect(),n())})})).observe(t))},n.render=function(){var e=this,t=this.props,n=t.to,a=t.getProps,o=void 0===a?this.defaultGetProps:a,u=t.onClick,l=t.onMouseEnter,s=(t.activeClassName,t.activeStyle,t.innerRef,t.state),h=t.replace,v=(0,r.default)(t,["to","getProps","onClick","onMouseEnter","activeClassName","activeStyle","innerRef","state","replace"]);var m=f(n);return c.default.createElement(d.Link,(0,i.default)({to:m,state:s,getProps:o,innerRef:this.handleRef,onMouseEnter:function(e){l&&l(e),___loader.hovering((0,p.parsePath)(n).pathname)},onClick:function(t){return u&&u(t),0!==t.button||e.props.target||t.defaultPrevented||t.metaKey||t.altKey||t.ctrlKey||t.shiftKey||(t.preventDefault(),y(n,{state:s,replace:h})),!0}},v))},t}(c.default.Component);v.propTypes=(0,i.default)({},h,{innerRef:s.default.func,onClick:s.default.func,to:s.default.string.isRequired,replace:s.default.bool});var m=c.default.forwardRef(function(e,t){return c.default.createElement(v,(0,i.default)({innerRef:t},e))});t.default=m;var y=function(e,t){window.___navigate(f(e),t)};t.navigate=y;var g=function(e){console.warn('The "push" method is now deprecated and will be removed in Gatsby v3. Please use "navigate" instead.'),window.___push(f(e))};t.push=g;t.replace=function(e){console.warn('The "replace" method is now deprecated and will be removed in Gatsby v3. Please use "navigate" instead.'),window.___replace(f(e))};t.navigateTo=function(e){return console.warn('The "navigateTo" method is now deprecated and will be removed in Gatsby v3. Please use "navigate" instead.'),g(e)}},151:function(e,t,n){"use strict";n.r(t),n.d(t,"graphql",function(){return v}),n.d(t,"StaticQueryContext",function(){return p}),n.d(t,"StaticQuery",function(){return f}),n.d(t,"useStaticQuery",function(){return h});var a=n(0),r=n.n(a),i=n(4),o=n.n(i),u=n(150),l=n.n(u);n.d(t,"Link",function(){return l.a}),n.d(t,"withPrefix",function(){return u.withPrefix}),n.d(t,"navigate",function(){return u.navigate}),n.d(t,"push",function(){return u.push}),n.d(t,"replace",function(){return u.replace}),n.d(t,"navigateTo",function(){return u.navigateTo});var s=n(152),c=n.n(s);n.d(t,"PageRenderer",function(){return c.a});var d=n(32);n.d(t,"parsePath",function(){return d.a});var p=r.a.createContext({}),f=function(e){return r.a.createElement(p.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})},h=function(e){r.a.useContext;var t=r.a.useContext(p);if(t[e]&&t[e].data)return t[e].data;throw new Error("The result of this StaticQuery could not be fetched.\n\nThis is likely a bug in Gatsby and if refreshing the page does not fix it, please open an issue in https://github.com/gatsbyjs/gatsby/issues")};function v(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}f.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},152:function(e,t,n){var a;e.exports=(a=n(155))&&a.default||a},153:function(e,t){e.exports=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}},154:function(e,t){function n(){return e.exports=n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},n.apply(this,arguments)}e.exports=n},155:function(e,t,n){"use strict";n.r(t);n(33);var a=n(0),r=n.n(a),i=n(4),o=n.n(i),u=n(54),l=n(2),s=function(e){var t=e.location,n=l.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(u.a,Object.assign({location:t,pageResources:n},n.json))};s.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=s},163:function(e){e.exports={data:{weatherData:{latitude:42.0334,longitude:-87.8834,timezone:"America/Chicago",currently:{time:1550799537,summary:"Clear",icon:"clear-night",nearestStormDistance:151,precipIntensity:0,precipProbability:0,temperature:28.19,apparentTemperature:22.66,dewPoint:18.15,humidity:.66,pressure:1027.01,windSpeed:4.93,windGust:5.68,windBearing:279,cloudCover:.1,uvIndex:0,visibility:10,ozone:275.32}}}}}}]);
//# sourceMappingURL=component---src-pages-darkabout-jsx-72b41e9ee17d222020d3.js.map