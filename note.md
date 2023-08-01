# Project Plan
1. Structure project:
&emsp;- node_modules
&emsp;- src:
&emsp;&emsp;+ config
&emsp;&emsp;+ controllers
&emsp;&emsp;+ public
&emsp;&emsp;+ routers
&emsp;&emsp;+ services
&emsp;&emsp;+ views
&emsp;&emsp;server.js
&emsp;... # config files

2. Config database (MySQL)    
```
# .sequelizerc file
const path = require('path');

module.exports = {
    'config': path.resolve('./src/config', 'config.json'),
    'migrations-path': path.resolve('./src', 'migrations'),
    'models-path': path.resolve('./src', 'models'),
    'seeders-path': path.resolve('./src', 'seeders'),
    
}
```



