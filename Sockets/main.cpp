#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <unordered_map>
using namespace std;

int calcularValorMao(const vector<string>& cartas) {
    unordered_map<string, int> valores = {
        {"2", 2}, {"3", 3}, {"4", 4}, {"5", 5}, {"6", 6}, {"7", 7}, {"8", 8}, {"9", 9},
        {"J", 10}, {"Q", 10}, {"K", 10}, {"A", 11}
    };
    int valorTotal = 0;
    int numAs = 0;

    for (const string& carta : cartas) {
        if (carta == "A") {
            numAs++;
        }
        valorTotal += valores[carta];
    }

    while (valorTotal > 21 && numAs > 0) {
        valorTotal -= 10;
        numAs--;
    }

    return valorTotal;
}


class Mao{
    private:
        vector<string> cartas;
        int valor;
    public:
    //Construtor

        Mao(vector<string> _cartas){
            cartas = _cartas;
            valor = calcularValorMao(cartas);
        }
    // getters e setters
        vector<string> getCartas(){
            return cartas;
        }
        void setCartas(vector<string> _cartas){
            cartas = _cartas;
        }
        int getValor(){
            valor = calcularValorMao(cartas);
            return valor;
        }
        void calcMao(){
            valor = calcularValorMao(cartas);
        }
        void addCarta(string carta){
            cartas.push_back(carta);
            calcMao();
        }
    };


class Jogador{
    private:
        string nome;
        int pontos;
        vector<Mao> mao;
    public:
    //Construtor

    Jogador(string _nome, vector<Mao> _mao){
        nome = _nome;
        mao = _mao;
        pontos = 10;
    }

    // getters e setters
    string getNome(){
        return nome;
    }
    void setNome(string _nome){
        nome = _nome;
    }
    vector<Mao> getMao(){
        return mao;
    }
    void setMao(vector<Mao> _mao){
        mao = _mao;
    }
    int getPontos(){
        return pontos;
    }
    void setPontos(int _pontos){
        pontos = _pontos;
    }

    //Metodos
};

class Jogo{
    private:
        vector<Jogador> jogadores;
        vector<string> dealer;
        vector<string> baralho;
    public:
    //Construtor
    
        Jogo()
        {
        baralho = {
        "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q","K","A", 
        "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q","K","A", 
        "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q","K","A", 
        "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q","K","A"};
        dealer = {};

        }
        // getters e setters
        vector<Jogador> getJogadores(){
            return jogadores;
        }
        void setJogadores(vector<Jogador> _jogadores){
            jogadores = _jogadores;
        }
        vector<string> getBaralho(){
            return baralho;
        }
        void setBaralho(vector<string> _baralho){
            baralho = _baralho;
        }
        //Metodos
        void embaralhar(){
            random_shuffle(baralho.begin(), baralho.end());
        }
        void giveCartasJ(){
            for(int i = 0; i < jogadores.size(); i++){
                jogadores[i].setMao({Mao({baralho[0], baralho[1]})});
                baralho.erase(baralho.begin());
                baralho.erase(baralho.begin());
            }
        }
        void giveCartasD(){
            dealer.push_back(baralho[0]);
            dealer.push_back(baralho[1]);
            baralho.erase(baralho.begin());
            baralho.erase(baralho.begin());
        }
        void darCartaJ(int i){
            jogadores[i].getMao()[0].addCarta(baralho[0]);
            baralho.erase(baralho.begin());
        }

        void darCartaD(){
                dealer.push_back(baralho[0]);
                baralho.erase(baralho.begin());
        }
        void printCartasJ(){
            for(int i = 0; i < jogadores.size(); i++){
                cout << "Cartas do jogador " << jogadores[i].getNome() << ": ";
                for(int j = 0; j < jogadores[i].getMao()[0].getCartas().size(); j++){
                    cout << jogadores[i].getMao()[0].getCartas()[j]<< "  ";
                    if (jogadores[i].getMao()[0].getValor() == 21){
                        cout << "BlackJack!" << endl;
                    }else if(jogadores[i].getMao()[0].getValor() > 21){
                        cout << "Estourou!" << endl;
                    }
                    cout << "Pontuacao:" << jogadores[i].getPontos() << endl;
                    

                }

                
                cout << endl;
            }
        }
        void printCartasD(){
            cout << "Cartas do dealer: ";
            for(int i = 0; i < dealer.size(); i++){
                cout << dealer[i] << " ";
            }
            cout << endl;
        }
        void zerarMaos(){
            for(int i = 0; i < jogadores.size(); i++){
                jogadores[i].setMao({});
            }
            dealer = {};
        }
        

        void Rodada(int nrodada){
            embaralhar();
            do{
            zerarMaos();
            cout << "Rodada " << nrodada << endl;
            giveCartasJ();
            giveCartasD();
            printCartasD();
            printCartasJ();
            nrodada++;
            }while(nrodada < 10);

        }
        

        


};
    





int main() {
    int opcao = 0;




    do {
        cout << endl;
        cout << "Bem vindo ao BlackJack!" << endl;
        cout << "===== Menu Principal =====" << endl;
        cout << "1. " << endl;

        cout << "0. Sair" << endl;
        cout << "==========================" << endl;
        cout << "Digite a opcao desejada: ";
        cin >> opcao;
        cout << endl;

        switch (opcao) {
            case 1:
                cout << "Opcao 1" << endl;
                break;

            case 0:
                cout << "Saindo..." << endl;
                break;
            default:
                cout << "Opcao invalida. Tente novamente." << endl;
                cout << endl;
                break;
        }

    } while (opcao != 0);


    return 0;
};
