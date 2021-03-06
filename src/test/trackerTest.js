
class TrackerTest {

	static CommonTests() {

    var application = SuiApplication.createUtApplication({scoreLoadJson:'emptyScoreJson'});

		var keys = application.controller;
		var score = keys.layout.score;
		var layout = keys.layout;

		score.addDefaultMeasureWithNotes(0, {});
		score.addDefaultMeasureWithNotes(1, {});
		score.addDefaultMeasureWithNotes(2, {});
		var timeTest = () => {
      layout.forceRender();

			const promise = new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve();
					},
						200);
				});
			return promise;
		}

		var subTitle = (txt) => {
			$('.subTitle').text(txt);
		}

		var signalComplete = () => {
			subTitle('');
			return timeTest();
		}

		var drawDefaults = () => {
			// music.notes = VX.APPLY_MODIFIERS (music.notes,staffMeasure.keySignature);
			// measure.applyModifiers();

      return timeTest();
		}

		var trackTest = () => {
			subTitle('initialize tracker');
			return timeTest();
		}

		var addInstrument = () => {
			subTitle('track multiple staves');
			score.addStaff();
      return timeTest();
		}

		var selectionTest1 = () => {
			subTitle('move selection right');
			keys.tracker.moveSelectionRight(null)
			return timeTest();
		}

		var selectionTest2 = () => {
			subTitle('move selection left');
			keys.tracker.moveSelectionLeft();
			return timeTest();
		}
		var selectionTest3 = () => {
			subTitle('move selection over 5');
			keys.tracker.moveSelectionOffset(5);
			return timeTest();
		}

		var selectDown = () => {
			subTitle('select staff below');
			keys.tracker.moveSelectionDown();
			return timeTest();
		}

		var selectIncreaseRight = () => {
			subTitle('grow selection right');
			keys.tracker.growSelectionRight();
			return timeTest();
		}

		var selectIncreaseLeft = () => {
			subTitle('grow selection left');
			keys.tracker.growSelectionLeft();
			return timeTest();
		}

		return drawDefaults().then(trackTest).then(addInstrument).then(selectionTest1)
		.then(selectionTest2).then(selectionTest3).then(selectDown)
		.then(selectIncreaseRight).then(selectIncreaseLeft).then(signalComplete);
	}
}
