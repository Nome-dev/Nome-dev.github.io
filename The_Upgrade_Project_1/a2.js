//var p2 = document.getElementById("p2");//Variável que representa o objeto de saída
var tb1 = document.getElementById("textBox1");//Variável que representa o objeto de entrada

var out1 = "";

start();//Inicializa a função start()

function button1_Click()//É executado quando o botão com id="button1" é pressionado
{
    verificar1();//Executa a função verificar1()
}

function verificar1()//Função principal da ação
{
    var value1 = tb1.value;//Variável que representa o valor de entrada, na forma de conjunto de caracteres
    
    verificar2(value1);

    aplicar1();
}

function start()
{
    
}

function aplicar1()
{
    document.getElementById("p2").innerText = out1;
}

function verificar2(value1)
{
    if(value1 == "Wow, um teste?" | value1 == "Um teste?")
    {
        out1 = "Teste";
    }
    
    if(value1 == "A test?" | value1 == "You have knowledge about the test?")
    {
        out1 = "Oops, this changed, kk";
    }
    
    if(value1 == "Input" | value1 == "A other input" | value1 == "And a other input")
    {
        out1 = "Output";
    }
    
}
