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

    static filterInvestments(typeFilter: string) : void{

        switch (typeFilter){
            case 'name':
                this.updateInvestiments(
                    this.filterInvestmentsByName()
                );
                break;
            case 'price':
                this.updateInvestiments(
                    this.filterInvestmentsByPrice()
                );
                break;
            case 'favorite':
                this.updateInvestiments(
                    this.filterInvestmentsByFavorite()
                );
                break;
            default:
                throw new Error(
                    'This function only recives "name", "price" and "favorite" as a param'
                )
        }
    }

    static filterInvestmentsByName() : Array<Investiment>{
        
        const investiment = this.getAllInvestiments()
        console.log(investiment.sort((a, b) => a.name.localeCompare(b.name)))
        return investiment.sort((a, b) => a.name.localeCompare(b.name))
    }

    static filterInvestmentsByPrice() : Array<Investiment>{

        const investiment = this.getAllInvestiments()
        return investiment.sort((a, b) => b.amount - a.amount)
        
    }
    
    static filterInvestmentsByFavorite() : Array<Investiment>{

        const investiments = this.getAllInvestiments()
        const favoriteInvestments = investiments.filter((investiment) => investiment.favorite)
        const notFavoriteInvestments = investiments.filter((investiment) => !investiment.favorite)

        return favoriteInvestments.concat(notFavoriteInvestments)

    }


}