const draggables = document.querySelectorAll(".draggable");
const droppables = document.querySelectorAll(".droppable");

const isDropped = (event: any) => event.target.classList.contains("dropped");

// drag functions
const handleDragStart = (event: any) => {
	event.dataTransfer?.setData("text", event?.target?.id);
};

// drop functions
const handleDragOver = (event: any) => {
	if (!isDropped(event)) {
		event.preventDefault();
	}
};

const handleDragEnter = (event: any) => {
	if (!isDropped(event)) {
		event.target.classList.add("droppable-hover");
	}
};

const handleDragLeave = (event: any) => {
	if (!isDropped(event)) {
		event.target.classList.remove("droppable-hover");
	}
};

const handleDrop = (event: any) => {
	event.preventDefault();
	const droppedData = event.dataTransfer.getData("text");
	const targetData = event.target.getAttribute("data-draggable-id");

	const isMatch = droppedData === targetData;

	if (isMatch) {
		const draggableElement = document.getElementById(droppedData);

		event.target.classList.add("dropped");
		event.target.classList.remove("droppable-hover");
		const newColor = window.getComputedStyle(
			draggableElement!
		).backgroundColor;
		event.target.style.backgroundColor = newColor;

		draggableElement?.setAttribute("draggable", "false");
		draggableElement?.classList.add("dragged");
	} else {
		event.target.classList.remove("droppable-hover");
	}
};

// setting events
draggables.forEach((element) => {
	element.addEventListener("dragstart", handleDragStart);
});

droppables.forEach((element) => {
	element.addEventListener("drop", handleDrop);
	element.addEventListener("dragleave", handleDragLeave);
	element.addEventListener("dragenter", handleDragEnter);
	element.addEventListener("dragover", handleDragOver);
});
