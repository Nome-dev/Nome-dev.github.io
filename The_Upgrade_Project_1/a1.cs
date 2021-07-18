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
        private static int Object_Size = 512;
        private static int file1_Size = 4096;
        private static int textChanged1_Size = 4096;
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
        public static string[] file1 = new string[file1_Size];
        public static int n5 = 0;//Início da região de escrita
        public static int n6 = 0;//Fim da região de escrita
        public static string[] textChanged1 = new string[textChanged1_Size];
        //Ler arquivo do path2 #start

        //Informações úteis #start
        public static string[,,] objects1 = new string[Position_Size, Object_Size, 2];//Uma matriz tridimensional ([Position, Object, Type [(0 = "Output"; 1 = "Input")], que contém todas as linhas já processadas
        public static int n1 = 0;//Número total de objetos
        public static int n2 = 0;//Número temporário de possíveis entradas para cada objeto
        public static int[] n3 = new int[Object_Size];//n3[objeto] = Número de possíveis entradas para este objeto
        public static int[,] n4 = new int[Position_Size, Object_Size];//n4[Position, Object] = Type [(0 = "Output"; 1 = "Input")];
        //Informações úteis #end

        public static void Main(string[] args)//Função principal
        {
            try
            {
                Start(args);//Inicia a aplicação
            }
            catch(Exception exception1)
            {
                Console.WriteLine(exception1.Message);
            }
        }

        public static void Start(string[] args)
        {
            initialConfiguration1(args);

            readFile1();

            readFile2();

            writeFile1();
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
            rules1 = File.ReadAllLines(path1);

            for(int i1 = 0; i1 < rules1.Length; i1++)
            {
                if(rules1[i1][0] == 'o' && rules1[i1][1] == ':' && rules1[i1][2] == ' ')
                {
                    n2 = 0;
                    n2++;
                    n1++;

                    rules1_Chars = new char[rules1[i1].Length - 3];

                    for(int i2 = 3; i2 < rules1[i1].Length; i2++)
                    {
                        rules1_Chars[i2 - 3] = rules1[i1][i2];
                    }

                    objects1[n2, n1, 0] = new string(rules1_Chars);
                    n4[n2, n1] = 0;

                    Console.WriteLine(objects1[n2, n1, 0] + " | " + Convert.ToString(n4[n2, n1]) + " | " + Convert.ToString(n1));
                }
                else if(rules1[i1][0] == 'i' && rules1[i1][1] == ':' && rules1[i1][2] == ' ')
                {
                    n2++;

                    rules1_Chars = new char[rules1[i1].Length - 3];

                    for(int i2 = 3; i2 < rules1[i1].Length; i2++)
                    {
                        rules1_Chars[i2 - 3] = rules1[i1][i2];
                    }

                    objects1[n2, n1, 1] = new string(rules1_Chars);
                    n4[n2, n1] = 1;

                    Console.WriteLine(objects1[n2, n1, 1] + " | " + Convert.ToString(n4[n2, n1]) + " | " + Convert.ToString(n1));
                }

                n3[n1] = n2;
            }
        }

        public static void readFile2()//Lê o arquivo "./a2.js" e prepara informações
        {
            
        }

        public static void writeFile1()//Escreve no arquivo "./a2.js", inserindo nele as verificações das regras
        {
            
        }
    }
}
