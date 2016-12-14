(
explosionFatale:{ arg reply;
	Pdef(\a, Pbind(\dur, 0.2, \degree, Pwhite())).play;
	reply.("gogo")
},
stop:{arg rep; Pdef(\a).stop; rep.("stop")},
go:{arg rep;
	"j'ai envie de dire bonjour".postln;
	Pbindef(\a, \degree, 10/Pdefn(\up).trace).play;
	rep.("link avec le slider")},
up:{arg reply, val; val.postln; Pdefn(\up,val); reply.(val)}
)
