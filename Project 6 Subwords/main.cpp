#include <iostream>
#include <string>
#include <vector>
#include <random>
#include <ctime>
#include <fstream>
#include <iterator>
#include <algorithm>

using namespace std;
vector<pair<int, string>> subWords = {};

void findSubwords(const string &theWord, const vector<string> &words)
{
    for (const string &word : words) // loop thru 80,000 words
    {
        string temp = theWord;
        for (const char &letter : word) // loop thru every letter of word
        {
            size_t pos = temp.find_first_of(letter);      // find first occurance of letter
            if (pos != string::npos && word.length() > 2) // if we found the the letter in theWord
            {
                temp.erase(pos, 1); //pop letter out of tempWord
                if (&letter == &word.back())
                {
                    pair<int, string> thePair = {word.length(), word};
                    subWords.push_back(thePair);
                    break;
                }
            }
            else // if we didnt find the letter in theWord
            {
                break;
            }
        }
    }
}

bool sortSecond(const pair<int, string> &a, const pair<int, string> &b)
{
    return (a.second < b.second);
}

void coutWords()
{
    sort(subWords.begin(), subWords.end());
    int lastLength = subWords.at(0).first;
    int lastPos = 0;
    for (int i = 0; i < subWords.size(); i++)
    {
        if (lastLength != subWords.at(i).first)
        {
            sort(subWords.begin() + lastPos, subWords.begin() + i, sortSecond);
            lastLength = subWords.at(i).first;
            lastPos = i;
        }
    }
    for (int i = 0; i < subWords.size(); i++)
    {
        cout << subWords.at(i).second << endl;
    }
}

int main()
{
    int NWORDS = 81483;
    default_random_engine dre(time(nullptr));    // Seed the engine
    uniform_int_distribution<int> di(0, NWORDS); // Use uniform distribution
    int n = di(dre);

    ifstream ifs("words.txt");
    vector<string> words{istream_iterator<string>(ifs), istream_iterator<string>()}; // fills array with file input
    ifs.close();

    string theWord = words.at(n);
    cout << "The word is: " << theWord << endl
         << endl;
    findSubwords(theWord, words); // finds subwords
    coutWords();                  // prints words to console
}