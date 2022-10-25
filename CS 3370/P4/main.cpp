#include <iostream>
#include <fstream>
#include <vector>
#include <array>
#include <iterator>
#include <string>

using std::string;
using std::array;
using std::cout;
using std::endl;

int main(int argc, char* argv[]) {
    array<string, 3> datFiles = {"2_Record2308.dat", "2_Record2388.dat", "as_ch01-0537xx_Record1042.dat"};

    for(int i = 1; i < argc; ++i){ // for each ini file
        cout << "FILE: " << argv[i] << endl;
        std::ifstream iniFile(argv[i]);
        double vt = -1;
        double width = -1;
        double pulseDelta = -1;
        double dropRatio = -1;
        double belowDropRatio = -1;
        
        char ch;
        string var = "";
        while(iniFile) {
            // READING INI FILE
            ch = iniFile.get();
            if (isspace(ch)) continue;
            
            if (ch == '='){
                // check if -1, to prevent duplicates/overwrites
                if (var == "vt" && vt == -1) iniFile >> vt;
                else if (var == "width" && width == -1) iniFile >> width;
                else if (var == "pulse_delta" && pulseDelta == -1) iniFile >> pulseDelta;
                else if (var == "drop_ratio" && dropRatio == -1) iniFile >> dropRatio;
                else if (var == "below_drop_ratio" && belowDropRatio == -1) iniFile >> belowDropRatio;
                else {
                    std::cout << "Invalid INI file property: \"" << var << "\"" << endl;
                    return 0;
                }
                var = "";
            }
            else if (ch == '#') {
                std::getline(iniFile, var);
                var = "";
            }
            else var.push_back(ch);
        }

        if (vt == -1 || width == -1 || pulseDelta == -1 || dropRatio == -1 || belowDropRatio == -1) {
            cout << "Invalid INI file: missing one or more properties" << endl;
            return 0;
        }

        // cout << vt << " " << width << " " << pulseDelta << " " << dropRatio << " " << belowDropRatio << endl;

        // READING DAT FILES
        for(int j = 0; j < datFiles.size(); ++j){ // for each dat file
            std::vector<int> data;
            std::ifstream datFile(datFiles[j]);

            int n;
            while(datFile >> n) data.push_back(-n); // negates and pushes data
            
            std::vector<int> smoothData;
            std::vector<int>::iterator it = data.begin();

            const int siz = data.size();
            // smooths data inside data vector, puts into smoothData vector
            for (int k = 0; k < siz; ++k) {
                if (k == 0 || k == 1 || k == 3 || k == siz-1 || k == siz-2 || k == siz-3)
                    smoothData.push_back(it[0]);
                else 
                    smoothData.push_back((it[-3] + 2*it[-2] + 3*it[-1] + 3*it[0] + 3*it[1] + 2*it[2] + it[3]) / 15);
            }

            cout << datFiles[j] << ":" << endl;
            std::vector<string> pulses;
            it = smoothData.begin() + 3;
            int pulseStart = -1;
            int pulsePeak = -1;
            int sum = 0;
            // finds pulse
            for (int k = 3; k < siz-3; ++k) { 
                // pulse start
                if (vt < (it[0] - it[-2]) && pulseStart == -1) {
                    cout << "found pulse: " << k << endl;
                    // piggy back
                    if (k - pulsePeak <= pulseDelta && pulsePeak != -1 && (k - pulsePeak) < (dropRatio * data[pulsePeak]) {
                        // overwrite previous pulse

                    }
                    pulseStart = k;
                    sum += it[0];
                }
                // during pulse
                else if (pulseStart != -1) 
                    sum += it[0];
                // end of pulse
                else if (it[0] < it[-1] && pulseStart != -1) {
                    pulses.push_back(std::to_string(pulseStart) + " (" + std::to_string(sum) + ")");
                    pulseStart = -1;
                    pulsePeak = k-1;
                    sum = 0;
                }
                it++;
            }
        }
    }
}