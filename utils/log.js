var Log = {
  // Its big, its heavy, its wood. //
  level: "warn",
  levels: ["warn", "debug"],
  debug: function (message) { this.write("debug", message) },
  warn:  function (message) { this.write("warn",  message) },

  write: function (logLevel, message) {
      if (logLevel == this.level ) {
        console.log(this.level.toUpperCase() + ": "); 
        console.log(message);
      } 
   },
   setLevel: function (newLevel) {
     if (this.levels.indexOf(newLevel) != -1) {
       this.level = newLevel;
     } else {
       throw "Invalid log level!";
     } 
   }
}


module.exports = Log; 
