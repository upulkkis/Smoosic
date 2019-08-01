
class defaultTrackerKeys {
	
	static get keys() {
		return [{
				event: "keydown",
				key: "ArrowRight",
				ctrlKey: false,
				altKey: false,
				shiftKey: false,
				action: "moveSelectionRight"
			}, {
				event: "keydown",
				key: "ArrowRight",
				ctrlKey: false,
				altKey: true,
				shiftKey: false,
				action: "advanceModifierSelection"
			}, {
				event: "keydown",
				key: "ArrowLeft",
				ctrlKey: false,
				altKey: false,
				shiftKey: false,
				action: "moveSelectionLeft"
			}, {
				event: "keydown",
				key: "ArrowRight",
				ctrlKey: false,
				altKey: false,
				shiftKey: true,
				action: "growSelectionRight"
			}, {
				event: "keydown",
				key: "ArrowLeft",
				ctrlKey: false,
				altKey: false,
				shiftKey: true,
				action: "growSelectionLeft"
			}, {
				event: "keydown",
				key: "ArrowUp",
				ctrlKey: true,
				altKey: false,
				shiftKey: false,
				action: "moveSelectionUp"
			}, {
				event: "keydown",
				key: "ArrowDown",
				ctrlKey: true,
				altKey: false,
				shiftKey: false,
				action: "moveSelectionDown"
			}, {
				event: "keydown",
				key: "ArrowRight",
				ctrlKey: true,
				altKey: false,
				shiftKey: false,
				action: "moveSelectionRightMeasure"
			}, {
				event: "keydown",
				key: "ArrowLeft",
				ctrlKey: true,
				altKey: false,
				shiftKey: false,
				action: "moveSelectionLeftMeasure"
			},{
				event: "keydown",
				key: "ArrowUp",
				ctrlKey: false,
				altKey: true,
				shiftKey: false,
				action: "moveSelectionPitchUp"
			},{
				event: "keydown",
				key: "ArrowDown",
				ctrlKey: false,
				altKey: true,
				shiftKey: false,
				action: "moveSelectionPitchDown"
			}
			];
	}
}