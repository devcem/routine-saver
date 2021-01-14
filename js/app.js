var finishedSound = new Howl({
  	src: ['media/finished.mp3']
});

var app = new Vue({
	el : '#app',
	data : {
		routines : [
			{
				name : '🏋 exercise',
				days : [],
				maxTime : 900
			},
			{
				name : '🧘 meditation',
				days : [],
				maxTime : 900
			}
		],
		dayNames : [],
		days : [],
		time : 900,
		currentRoutine : {},
	},
	methods : {
		init : function(){
			var date = new Date();

			var days = [
				'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
			];

			for(var i = 1; i <= 30; i++){
				var d = new Date(date.getFullYear(), date.getMonth(), i);
				var dayName = days[d.getDay()];

				this.days.push(i);
				this.dayNames.push(dayName);
			}

			var routines = window.localStorage.getItem('RoutineSaver');

			if(routines){
				this.routines = JSON.parse(routines);
			}

			this.currentRoutine = this.routines[0];
		},
		mmss : function($seconds){
			var seconds = $seconds;
	        var ms = Math.floor((seconds*1000) % 1000);
	        var s = Math.floor(seconds%60);
	        var m = Math.floor((seconds*1000/(1000*60))%60);
	        var strFormat = "MM:SS";

	        if(s < 10) s = "0" + s;
	        if(m < 10) m = "0" + m;
	        if(ms < 100) ms = "0" + ms;

	        strFormat = strFormat.replace(/MM/, m);
	        strFormat = strFormat.replace(/SS/, s);

	        return strFormat;
		},
		markDay : function(day){
			if(this.currentRoutine.days.indexOf(day) > -1){
				this.currentRoutine.days.splice(this.currentRoutine.days.indexOf(day), 1);
			}else{
				this.currentRoutine.days.push(day);
			}
			
			window.localStorage.setItem('RoutineSaver', JSON.stringify(this.routines));
		},
		start : function(){
			this.time = parseInt(this.currentRoutine.maxTime + '');

			clearInterval(this.timer);
			this.timer = setInterval(function(self){
				self.time--;

				if(self.time <= 0){
					finishedSound.play();
					clearInterval(self.timer);
				}
			}, 1000, this);
		},
		reset : function(){
			this.time = 900;
			clearInterval(this.timer);
		}
	}
});

window.onload = function(){
	app.init();
};