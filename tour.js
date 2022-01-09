class Walkthrough {
    // constructor(stops) {
    //     this.stops = stops;
    //     this.currentIndex = 0;
    // }
    constructor(stops,currentIndex=0) {
        this.stops = stops;
        this.currentIndex = currentIndex;
    }

    start = () => {

        console.log('Hello');

        this.initOverlay();

        this.managingPopovers(0);
    };


    initOverlay = () => {
        console.log('overlay');

        let overlay = document.createElement("div");
        overlay.classList.add("tour-overlay");
        document.body.append(overlay);
        // Remove on overlay click
        // overlay.addEventListener("click", this.destroyStep);
        this.overlay = overlay;
    };

    click = () => {
        console.log('click');

        if (this.currentStepElm) {
            this.currentStepElm.classList.remove("tour-stop");
        }

        setTimeout(this.managingPopovers, 500, 1);

        // this.managingPopovers(1);
    };

    next = () => {
        console.log('next');


        if (this.currentStepElm) {
            this.currentStepElm.classList.remove("tour-stop");
        }

        setTimeout(this.managingPopovers, 500, 1);

        // this.managingPopovers(1);
    };
    back = () => {
        console.log('prev');

        if (this.currentStepElm) {
            this.currentStepElm.classList.remove("tour-stop");
        }

        setTimeout(this.managingPopovers, 500, -1);
        // this.managingPopovers(-1);
    };
    destroyStep = () => {

        console.log('destroy');

        // Remove overlay
        this.overlay.remove();
        // Remove message
        // Remove Class from Current Stop
        if (this.currentStepElm) {
            this.currentStepElm.classList.remove("tour-stop");
        }

        // Reset Index to 0
        this.currentIndex = 0;

    };

    // direction: 1 | -1 | 0
    managingPopovers = (direction) => {



        console.log('managingPopovers');

        // Remove Class from Current Stop
        if (this.currentStepElm) {
            this.currentStepElm.classList.remove("tour-stop");
        }
        // Increase Stop Index Count
        this.currentIndex = this.currentIndex + direction;

        // Find Node Location and Set
        this.currentStepElm = document.querySelector(this.stops[this.currentIndex].id);



        this.currentStepElm.classList.add("tour-stop");

        this.updatePopovers();
    };
    updatePopovers = () => {
        console.log('updatePopovers');
        if (!this.currentStepElm) return;
        let currentStop = this.stops[this.currentIndex];
        this.updateMessageText(currentStop);
    };

    // Stop format - id, heading, description, nextStep
    updateMessageText = (currentStop) => {

        console.log('updateMessageText')


        let bubble = document.createElement("div");
        bubble.classList.add("media");
        bubble.innerHTML = `
            <div >
                <p id="para"></p>
                <button class="btn btn-secondary btn-sm prev">PREV</button>
                <button class="btn btn-secondary btn-sm prev next">NEXT</button>
                <button class="btn btn-secondary btn-sm prev close">CLOSE</button>
            </div>`

        var popover = new bootstrap.Popover(this.currentStepElm, {
            title: `<i>STEP   ${this.currentIndex + 1} OF ${this.stops.length}  <br><br> </i>` + currentStop.heading,
            content: bubble,
            placement: 'right',
            trigger: 'click',
            html: true
        });

        // bubble.style.position = "relative";
        // bubble.style.zIndex = 9998;

        // bubble.style.background = "red";

        let content = bubble.querySelector('#para');

        content.textContent = currentStop.description;

        popover.show();


        let prev = bubble.querySelector(".prev");
        let next = bubble.querySelector(".next");
        let close = bubble.querySelector(".close");
        let obj = this;
        close.innerHTML = 'DONE';


        if (this.currentIndex == 0) {
            prev.disabled = true;
        } else {

            if(this.stops[this.currentIndex-1].nextStep == "click")
            {
                prev.style.visibility = "hidden";
            }
            else
            {
                prev.disabled = false;
            }
        }

        if (this.currentIndex == this.stops.length) {
            this.destroyStep();
            return;
        }

        if (this.currentIndex == this.stops.length - 1) {
            next.disabled = true;
            close.innerHTML = 'CLOSE';

        } else {
            next.disabled = false;
            close.innerHTML = 'CLOSE';
        }




        if (currentStop.nextStep == "click") {
            next.style.visibility = "hidden";
            prev.style.visibility = "hidden";
            this.currentStepElm.addEventListener("click", clickStep);
        }


        // Close Btn
        close.addEventListener('click', closeStep);

        function closeStep() {
            console.log('closeStep');

            popover.hide();

            obj.destroyStep();

        }


        // Next Step WITH element click
        function clickStep() {
            console.log('clickStep');

            popover.hide();

            obj.click();

        }

        // Next Step Btn without element click
        next.addEventListener('click', nextStep);

        function nextStep() {
            console.log('nextStep');

            popover.hide();

            obj.next();

        }

        // Prev Step Btn
        prev.addEventListener('click', prevStep);

        function prevStep() {
            console.log('prevStep');

            popover.hide();

            obj.back();

        }


    }
}

function startTour() {


    // // localStorage.setItem('steps', JSON.stringify(stops))
    // let data = localStorage.getItem('stepsObject');
    // // let data = document.getElementById("data").value;

    const pageTour = new Walkthrough(stops,0);

    setTimeout(pageTour.start, 500);

    // pageTour.start();



}

let stops = [{
        id: "#name",
        heading: "Enter Name",
        description: "Name should not contain digits",
        nextStep: "next"
    },
    {
        id: "#email",
        heading: "Enter email",
        description: "afsfsf",
        nextStep: "next"
    },
    {
        id: "#para",
        heading: "Para",
        description: "afsfsf",
        nextStep: "next"
    },
    {
        id: "#home",
        heading: "home",
        description: "afsfsf",
        nextStep: "click"
    },
    {
        id: "#p3",
        heading: "Para",
        description: "afsfsf",
        nextStep: "next"
    },
    {
        id: "#about",
        heading: "ABOUT",
        description: "afsfsf",
        nextStep: "click",
        position: 'bottom',
        ind: "0"
    },
    {
        id: "#mat-checkbox-1 > label > span.mat-checkbox-inner-container",
        heading: "checkbox",
        description: "afsfsf",
        nextStep: "next",
        position: 'bottom',
        ind: "1"
    },
    {
        id: "#mat-radio-3 > label > span.mat-radio-container > span.mat-radio-outer-circle",
        heading: "radio button",
        description: "afsfsf",
        nextStep: "click",
        position: 'bottom',
        ind: "2"
    },
    {
        id: "body > app-root > mat-sidenav-container > mat-sidenav-content > div > app-about > div > div:nth-child(4) > mat-form-field > div > div.mat-form-field-flex.ng-tns-c94-1",
        heading: "dropdown",
        description: "afsfsf",
        nextStep: "click",
        position: 'bottom',
        ind: "3"
    },
    {
        id: "#mat-option-1 > span",
        heading: "pizza",
        description: "afsfsf",
        nextStep: "click",
        position: 'right',
        ind: "4"
    }
] 


document.addEventListener("DOMContentLoaded", () => {
    console.log("External JS script loaded");

    if (document.getElementById("demo")) {
        document.getElementById("demo").addEventListener("click", startTour);

    }

})