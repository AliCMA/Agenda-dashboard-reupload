class AgendaApp {
    api;
    swticher;

    constructor() {
        this.api = new API();
        this.switcher = new Switcher(this);
        this.api.getData().then(result => {
            this.switcher.loadAgenda(result[0]);
        });
    }
}

class API {
    dataFromAPI = [];

    async getData() {
        await fetch("../data/data.json").then(response => {
            return response.json();
        }).then(data => {
            this.dataFromAPI = data.months;
        })
        return this.dataFromAPI;
    }
}

class Agenda {
    renderer;
    header;
    month;
    htmlElement;
    agendaApp;

    constructor(data, agendaApp) {
        this.agendaApp = agendaApp;
        this.htmlElement = document.createElement("article");
        this.htmlElement.classList.add("agenda");
        this.data = data;
        console.log(data);
        this.renderer = new Renderer();
        this.renderer.render("body", this.htmlElement);
        this.header = new Header(this, data.name, this.agendaApp);
        this.month = new Month(this, data.days);
    }

    render(placeToRender, whatToRender) {
        this.renderer.render(placeToRender, whatToRender);
    }
}



class Renderer {
    render(placeToRender, whatToRender) {
        document.querySelector(placeToRender).appendChild(whatToRender);
    }
}

class Header {
    nameOfMonth;
    htmlElement;
    agenda;
    leftButton;
    rightButton;

    constructor(agenda, nameOfMonth, agendaApp) {
        this.agenda = agenda;
        this.agendaApp = agendaApp;
        this.nameOfMonth = nameOfMonth;
        this.htmlElement = document.createElement("header");
        this.htmlElement.classList.add("agenda__header");
        this.text = document.createElement("h2")
        this.agenda.render(".agenda", this.htmlElement);
        this.leftButton = new Button("<", "agenda--left", this,this.AgendaApp);
        this.agenda.render(".agenda__header", this.text);
        this.rightButton = new Button(">", "agenda--right", this,this.AgendaApp);
        this.text.innerText = this.nameOfMonth;
        

    }

    render(placeToRender, whatToRender){
        this.agenda.render(placeToRender, whatToRender);
    }
}

class Button{
    htmlElement;
    innerText
    extraClass;
    switcher;
    header;
    constructor(innerText, extraClass, header, agendaApp){
        this.agendaApp = agendaApp;
        this.htmlElement = document.createElement("button");
        this.htmlElement.classList.add("agenda__button");
        this.extraClass = extraClass;
        this.htmlElement.classList.add(this.extraClass);
        this.innerText = innerText;
        this.htmlElement.innerText = this.innerText;
        // this.switcher = new Switcher(this.extraClass);
        this.header = header;
        this.render();

        this.htmlElement.onclick = this.buttonClicked;
    }

    buttonClicked = () => {
        console.log(this.agendaApp);
    }

    render(){
        this.header.render("header", this.htmlElement);
    }
}

class Switcher{
    loadAgenda;
    agendaApp;
    agenda;
    constructor(agendaApp){
        this.agendaApp = this.agendaApp;
    }

    loadAgenda = (data) =>{
        this.agenda = new Agenda(data, this.agendaApp);
    } 

    clicked = (type) => {
        console.log("ik moer naar", type);
    }
}

class Month {
    days = [];
    agenda;
    numberOfDays;
    htmlElement;

    constructor(agenda, numberOfDays) {
        this.htmlElement = document.createElement("ul");
        this.htmlElement.classList.add("agenda__month");
        this.numberOfDays = numberOfDays;
        console.log(numberOfDays);
        this.agenda = agenda;
        this.agenda.render(".agenda", this.htmlElement);
        for (let i = 1; i <= numberOfDays; i++) {
            this.days.push(new Day(this, i));
        }
    }
    
    renderDays(placeToRender, whatToRender){
        this.agenda.render(placeToRender, whatToRender);
    }
}

class Day {
    month;
    htmlElement;
    dayNumber;

    constructor(month, dayNumber) {
        this.dayNumber = dayNumber;
        this.htmlElement = document.createElement("li");
        this.htmlElement.classList.add("agenda__day");
        this.htmlElement.innerText = this.dayNumber;
        this.month = month;
        this.month.renderDays(".agenda__month", this.htmlElement);
    }
}

const jeroenZijnAgenda = new AgendaApp();
console.log(jeroenZijnAgenda);