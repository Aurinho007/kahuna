import Investiment from "../types/Investiment";

export default class Controller {

    static getAllInvestiments(): Investiment[] {
        let investiments = localStorage.getItem('investiments');
        
        if(investiments) {
            return JSON.parse(investiments);
        }
        return [];
    }

    static updateInvestiments(investiments: Investiment[]): void {
        localStorage.clear();
        localStorage.setItem('investiments', JSON.stringify(investiments));
    }

    static removeInvestiment(investiment: Investiment): void {
        let investiments = this.getAllInvestiments();

        investiments = investiments.filter(inv => inv.id !== investiment.id);
        this.updateInvestiments(investiments);
    }

    static saveInvestiment(investiment: Investiment): void {
        let investiments = this.getAllInvestiments();
        
        investiment.id = this.getNewInvestimentId();
        investiments.push(investiment);
        this.updateInvestiments(investiments);
    }

    static getNewInvestimentId(): number {
        const investiments: Investiment[] = this.getAllInvestiments();
        
        if(investiments.length > 0) {
            return ++investiments[investiments.length - 1].id;
        }
        return 0;
    }
}