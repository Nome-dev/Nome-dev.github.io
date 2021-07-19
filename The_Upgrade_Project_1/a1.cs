using System;
using System.Collections;
using System.Security;
using System.IO;
using System.Drawing;
using System.Net;
using System.Windows.Forms;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Windows.Input;
using System.Security.Cryptography;
using System.Runtime.InteropServices;
using System.Runtime;
using System.Threading;
using System.Drawing.Imaging;
using System.Diagnostics;
using System.Net.Mail;
using System.Media;
using System.Globalization;
using Microsoft;
using Microsoft.Win32;
using System.Net.Sockets;

using Classe29;
using Classesave;

namespace Classe1
{
    public class classe1
    {
        //Tamanhos #start
        private static int rules_Size = 4096;
        private static int rules_Chars_Size = 4096;
        private static int Position_Size = 512;
        private static int Object_Size = 1024;
        private static int file1_Size = 4096;
        private static int textChanged1_Size = 4096;
        private static int outText1_Size = 4096 * 2;
        //Tamanhos #end

        //Caminhos #start
        public static string path1 = "./rules.txt";//Caminho do arquio que contém as regras
        public static string path2 = "./a2.js";//Caminho do arquivo de JavaScript do software
        //Caminhos #end

        //Ler arquivo do path1 #start
        public static string[] rules1 = new string[rules_Size];//Uma matriz unidimensional de strings, que contém todas as linhas do arquivo que contém as regras
        public static char[] rules1_Chars = new char[rules_Chars_Size];//Uma matriz unidimensional de caracteres, é uma matriz temporária, pois contém a linha que está sendo processada
        //Ler arquivo do path1 #end

        //Ler arquivo do path2 #start
        public static string[] file1 = new string[file1_Size];//Uma matriz unidimensional de strings, que contém todas as linhas do arquivo "./a2.js"
        public static int n5 = 0;//Início da região de escrita
        public static int n6 = 0;//Fim da região de escrita
        public static string[] textChanged1 = new string[textChanged1_Size];
        public static string[] outText1 = new string[outText1_Size];
        public static string[] outText2 = new string[outText1_Size];
        //Ler arquivo do path2 #start

        //Informações úteis #start
        public static string[,,] objects1 = new string[Position_Size, Object_Size, 2];//Uma matriz tridimensional ([Position, Object, Type [(0 = "Output"; 1 = "Input")], que contém todas as linhas já processadas
        public static int n1 = 0;//Número total de objetos
        public static int n2 = 0;//Número temporário de possíveis entradas para cada objeto
        public static int[] n3 = new int[Object_Size];//n3[objeto] = Número de possíveis entradas para este objeto
        public static int[,] n4 = new int[Position_Size, Object_Size];//n4[Position, Object] = Type [(0 = "Output"; 1 = "Input")];
        public static string[] objects2 = new string[Object_Size];
        public static string[,] objects3 = new string[Position_Size, Object_Size];
        //Informações úteis #end

        public static void Main(string[] args)//Função principal
        {
            //try
            //{
                Start(args);//Inicia a aplicação
            //}
            //catch(Exception exception1)
            //{
            //    Console.WriteLine(exception1.Message);
            //}
        }

        public static void Start(string[] args)
        {
            List<Action> process1 = new List<Action>();

            process1.Add(() => initialConfiguration1(args));
            process1.Add(() => readFile1());
            process1.Add(() => readFile2());
            process1.Add(() => writeFile1());

            foreach(Action a in process1)
            {
                try
                {
                    a();
                }
                catch(Exception e1)
                {
                    Console.WriteLine(e1.Message);
                }
            }
        }

        public static void initialConfiguration1(string[] args)//Faz as configurações iniciais, sobre o caminho do arquivo que contém as regras
        {
            if(args[0] == "default" | args[0] == "0" | args[0] == "d" | args[0] == "Default" | args[0] == "D")
            {
                path1 = "./rules.txt";
            }
            else
            {
                path1 = args[0];
            }
        }

        public static void readFile1()//Lê as informações do arquivo de regras e organiza as informações
        {
            rules1 = new string[File.ReadAllLines(path1).Length];
            rules1 = File.ReadAllLines(path1);

            int n9 = 0;

            
            for(int i1 = 0; i1 < rules1.Length; i1++)
            {
                if(rules1[i1][0] == 'o' && rules1[i1][1] == ':' && rules1[i1][2] == ' ')
                {
                    n2 = 0;

                    if(n9 > 0)
                    {
                        n1++;
                    }

                    rules1_Chars = new char[rules1[i1].Length - 3];

                    for(int i2 = 3; i2 < rules1[i1].Length; i2++)
                    {
                        rules1_Chars[i2 - 3] = rules1[i1][i2];
                    }

                    objects1[n2, n1, 0] = new string(rules1_Chars);
                    objects2[n1] = new string(rules1_Chars);
                    n4[n2, n1] = 0;

                    Console.WriteLine(objects1[n2, n1, 0] + " | " + Convert.ToString(n4[n2, n1]) + " | " + Convert.ToString(n1));

                    //n2++;

                    n9++;
                }
                else if(rules1[i1][0] == 'i' && rules1[i1][1] == ':' && rules1[i1][2] == ' ')
                {
                    rules1_Chars = new char[rules1[i1].Length - 3];

                    for(int i2 = 3; i2 < rules1[i1].Length; i2++)
                    {
                        rules1_Chars[i2 - 3] = rules1[i1][i2];
                    }

                    objects1[n2, n1, 1] = new string(rules1_Chars);
                    objects3[n2, n1] = new string(rules1_Chars);
                    n4[n2, n1] = 1;

                    Console.WriteLine(objects1[n2, n1, 1] + " | " + Convert.ToString(n4[n2, n1]) + " | " + Convert.ToString(n1));

                    n2++;
                }
                else
                {
                    Console.WriteLine("Erro");
                }

                n3[n1] = n2;
            }
        }

        public static void readFile2()//Lê o arquivo "./a2.js" e prepara informações
        {
            file1 = new string[File.ReadAllLines(path2).Length];
            file1 = File.ReadAllLines(path2);

            if(salvar.existe1("n5") == false)
            {
                salvar.write3("n5", "33");
            }

            if(salvar.existe1("n5") == true)
            {
                n5 = Convert.ToInt32(salvar.read2("n5")) - 18;
            }

            if(salvar.existe1("n6") == false)
            {
                salvar.write3("n6", "33");
            }

            if(salvar.existe1("n6") == true)
            {
                n6 = Convert.ToInt32(salvar.read2("n6"));
            }
        }

        public static void writeFile1()//Escreve no arquivo "./a2.js", inserindo nele as verificações das regras
        {
            n6 = (n1 + 1) * 5 + n5;
            int n7 = 0;
            int n8 = 0;        

            for(int i1 = 0; i1 < file1.Length; i1++)
            {
                outText1[i1] = file1[i1];
            }

            for(int i3 = n5; i3 < outText1.Length; i3++)
            {
                outText1[i3] = "";
            }

            //outText1 = file1;
            for(int i3 = n5; i3 < n6; i3++)
            {
                if(n7 == 0)
                {

                    outText1[i3] = "    if(";

                    //Console.WriteLine("O problema não está acima deste lugar");

                    for(int i2 = 0; i2 <= n3[n8]; i2++)
                    {
                        if(i2 == 0)
                        {
                            if(objects3[i2, n8] == null | objects3[i2, n8] == "")
                            {
                                //Console.WriteLine("Valor inválido!");
                            }
                            else
                            {
                                outText1[i3] = outText1[i3] + "value1 == \"" + objects3[i2, n8] + "\"";
                            }
                        }

                        if(i2 > 0)
                        {
                            if(objects3[i2, n8] == null | objects3[i2, n8] == "")
                            {
                                //Console.WriteLine("Valor inválido!");
                            }
                            else
                            {
                                outText1[i3] = outText1[i3] + " | value1 == \"" + objects3[i2, n8] + "\"";
                            }
                        }
                    }

                    outText1[i3] = outText1[i3] + ")";
                }

                if(n7 == 1)
                {
                    outText1[i3] = "    {";
                }

                if(n7 == 2)
                {
                    outText1[i3] = "        out1 = \"" + objects2[n8] + "\";";
                }

                if(n7 == 3)
                {
                    outText1[i3] = "    }";
                }

                if(n7 == 4)
                {
                    outText1[i3] = "    ";
                }

                //Console.WriteLine(outText1[i3]);

                n7++;

                if(n7 > 4)
                {
                    n7 = 0;
                        
                    n8++;
                }
            }

            outText1[n6] = "}";

            outText2 = new string[n6 + 1];

            for(int i1 = 0; i1 <= n6; i1++)
            {
                outText2[i1] = outText1[i1];
                Console.WriteLine(outText1[i1]);
            }

            File.WriteAllLines(path2, outText2);

            salvar.write3("n6", Convert.ToString(n6));
        }

        /* 
        function verificar2(value1)
        {
            if(value1 == "input1" | value1 == "input2")
            {
                out1 = "Out";
            }

        }
         */
    }
}
