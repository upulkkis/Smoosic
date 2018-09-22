

class NoVexNote {
    constructor(params) {
        Vex.Merge(this, NoVexNote.defaults);
        Vex.Merge(this, params);
        var ticks = VF.durationToTicks(this.duration);
        this.ticks = {
            numerator: ticks,
            denominator: 1,
            remainder: 0
        };
        this.tupletInfo = {};
        this.attrs = {
            id: VF.Element.newID(),
            type: 'NoVexNote'
        };
        this.accidentals = [];
        this.dots = 0;
    }

    toVexKeys() {
        var rv = [];
        for (var i = 0; i < this.keys.length; ++i) {
            var key = this.keys[i];
            rv.push(key.key + '/' + key.octave);
        }
        return rv;
    }
    _sortKeys() {
        var canon = VF.Music.canonical_notes;
        var keyIndex = ((key) => {
            return canon.indexOf(key.key) + key.octave * 12;
        });
        this.keys.sort((a, b) => {
            return keyIndex(a) - keyIndex(b);
        });
    }
    addPitchOffset(offset) {
        if (this.keys.length == 0) {
            return this;
        }
        var key = this.keys[0];
        this.keys.push(vexMusic.getKeyOffset(key, offset));

        this._sortKeys();
    }

    transpose(pitchArray, offset) {
        var keys = [];
        for (var j = 0; j < pitchArray.length; ++j) {
            var index = pitchArray[j];
            if (index + 1 > this.keys.length) {
                this.addPitchOffset(offset);
            } else {
                this.keys[index] = vexMusic.getKeyOffset(this.keys[index], offset);
            }
        }
        this._sortKeys();
        return this;
    }
    get tickCount() {
        return this.ticks.numerator / this.ticks.denominator + this.ticks.remainder;
    }
    setKeys(selections, keys) {
        this.keys = keys;
        return this;
    }
    // ## Accidental format
    // {index:1,value:{symbol:'#',cautionary:false}}
    addAccidental(accidental) {
        for (var i = 0; i < this.accidentals.length; ++i) {
            var aa = this.accidentals[i];
            if (aa.index === accidental.index) {
                aa.value = accidental.value;
                return;
            }
        }
        this.accidentals.push(accidental);
        return this;
    }
    addDots(num) {
        this.dots = num;
        return this;
    }
    static get defaults() {
        return {
            timeSignature: '4/4',
            keySignature: "C",
            clef: 'treble',
            noteType: 'n',
            numBeats: 4,
            beatValue: 4,
            duration: '4',
            keys: [{
                    key: 'b',
                    octave: 4,
                    accidental: ''
                }
            ],
            accidentals: []
        }
    }
}

class NoVexTuplet {
    constructor(params) {
        this.notes = params.notes;
        Vex.Merge(this, NoVexTuplet.defaults);
        Vex.Merge(this, params);
        this.attrs = {
            id: VF.Element.newID(),
            type: 'NoVexTuplet'
        };
        this._adjustTicks();
    }

    _adjustTicks() {
        for (var i = 0; i < this.notes.length; ++i) {
            var note = this.notes[i];
            var normTicks = VF.durationToTicks(note.duration);
            var tupletBase = normTicks * this.notes_occupied;
            note.ticks.denominator = 1;
            note.ticks.numerator = Math.floor(tupletBase / this.num_notes);
            // put all the remainder in the first note of the tuplet
            note.ticks.remainder = (i == 0) ? tupletBase % this.num_notes : 0;

            note.tuplet = this.attrs;
        }
    }
    get tickCount() {
        var rv = 0;
        for (var i = 0; i < this.notes.length; ++i) {
            var note = this.notes[i];
            rv += (note.ticks.numerator / note.ticks.denominator) + note.ticks.remainder;
        }
        return rv;
    }
    static get defaults() {
        return {
            num_notes: 3,
            notes_occupied: 2,
            location: 1,
            bracketed: true,
            ratioed: false
        }
    }
}

class NoVexBeamGroup {
    constructor(params) {
        this.notes = params.notes;
        this.attrs = {
            id: VF.Element.newID(),
            type: 'NoVexBeamGroup'
        };
        Vex.Merge(this, params);

        for (var i = 0; i < this.notes.length; ++i) {
            var note = this.notes[i];
            note.beam_group = this.attrs;
        }
    }
}

class NoVexMeasure {
    constructor(params) {
        this.tuplets = [];
        this.beamGroups = [];
        this.notes = [];
        this.measureNumber = 1;
        this.attrs = {
            id: VF.Element.newID(),
            type: 'NoVexMeasure'
        };
        Vex.Merge(this, NoVexMeasure.defaults);
        Vex.Merge(this, params);
    }
    static get defaults() {
        return {
            timeSignature: '4/4',
            keySignature: "C",
            staffX: 10,
            customModifiers: [],
            staffY: 40,
            drawClef: true,
            staffWidth: 400,
            clef: 'treble',
            numBeats: 4,
            beatValue: 4,
            notes: [
                new NoVexNote({
                    clef: "treble",
                    keys: [{
                            key: 'b',
                            accidental: '',
                            octave: 4
                        }
                    ],
                    duration: "4"
                }),
                new NoVexNote({
                    clef: "treble",
                    keys: [{
                            key: 'b',
                            accidental: '',
                            octave: 4
                        }
                    ],
                    duration: "4"
                }),
                new NoVexNote({
                    clef: "treble",
                    keys: [{
                            key: 'b',
                            accidental: '',
                            octave: 4
                        }
                    ],
                    duration: "4"
                }),
                new NoVexNote({
                    clef: "treble",
                    keys: [{
                            key: 'b',
                            accidental: '',
                            octave: 4
                        }
                    ],
                    duration: "4"
                })
            ]
        };
    }

    clearAccidentals() {
        for (var i = 0; i < this.notes.length; ++i) {
            this.notes[i].accidentals = [];
        }
    }

	removeTupletForNote(note) {
		var tuplets=[];
		for (var i=0;i<this.tuplets.length;++i) {
			var tuplet = this.tuplets[i];
			if (note.tuplet.id !== tuplet.attrs.id) {
				tuplets.push(tuplet);
			}
		}
		this.tuplets=tuplet;
	}
    addCustomModifier(ctor, parameters) {
        this.customModifiers.push({
            ctor: ctor,
            parameters: parameters
        });
    }

    setNumber(measureNumber) {
        this.measureNumber = measureNumber;
    }
    getTupletForNote(note) {
        if (!vexMusic.isTuplet(note)) {
            return null;
        }
        for (var i = 0; i < this.tuplets.length; ++i) {
            var tuplet = this.tuplets[i];
            if (tuplet.attrs.id === note.tuplet.id) {
                return tuplet;
            }
            return null;
        }
    }
    getBeamGroupForNote(note) {
        for (var i = 0; i < this.beamGroups.length; ++i) {
            var bg = this.beamGroups[i];
            for (var j = 0; j < bg.notes.length; ++j) {
                if (bg.notes[j].attrs.id === note.attrs.id) {
                    return bg;
                }
            }
        }
        return null;
    }
}
