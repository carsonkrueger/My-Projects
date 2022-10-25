#include <iostream>
#include <fstream>
#include <vector>
#include <array>
#include <iterator>
#include <string>
#include <filesystem>

namespace fs = std::filesystem;

using std::string;
using std::array;
using std::cout;
using std::endl;

int main(int argc, char* argv[]) {
    std::vector<string> datFiles;
    std::string path(".");
    std::string ext(".dat");
    for (auto &p : fs::recursive_directory_iterator(path))
    {
        if (p.path().extension() == ext)
            datFiles.push_back(p.path().string());
            // std::cout << "FOUND DAT: " << p.path().string() << '\n' << endl;
    }

    for(int i = 1; i < argc; ++i){ // for each ini file
        std::ifstream iniFile(argv[i]);
        double vt = -1;
        double width = -1;
        double pulseDelta = -1;
        double dropRatio = -1;
        double belowDropRatio = -1;
        
        char ch;
        string var = "";
        // READING INI FILE
        // For each ini file, run the ini settings on each .dat file
        while(iniFile) {
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
            else if (ch == '#') { // Comments in ini file
                std::getline(iniFile, var);
                var = "";
            }
            else var.push_back(ch);
        }
        
        // cout << vt << " " << width << " " << pulseDelta << " " << dropRatio << " " << belowDropRatio << endl;

        if (vt == -1 || width == -1 || pulseDelta == -1 || dropRatio == -1 || belowDropRatio == -1) {
            cout << "Invalid INI file: missing one or more properties" << endl;
            continue;
        }

        // READING DAT FILES
        for(size_t j = 0; j < datFiles.size(); ++j){ // for each dat file
            std::vector<int> data;
            std::ifstream datFile(datFiles[j]);

            // read in unsmoothed data and negate it
            int n;
            while(datFile >> n) data.push_back(-n); // negates and pushes data into data vector
            
            std::vector<int> smoothData;
            std::vector<int>::iterator it = data.begin();

            const int siz = data.size();
            // smooths data inside data vector, puts into smoothData vector
            for (int k = 0; k < siz; ++k) {
                if (k == 0 || k == 1 || k == 3 || k == siz-1 || k == siz-2 || k == siz-3) smoothData.push_back(it[0]);
                else smoothData.push_back((it[-3] + 2*it[-2] + 3*it[-1] + 3*it[0] + 3*it[1] + 2*it[2] + it[3]) / 15);
                it ++;
            }

            cout << datFiles[j] << ":" << endl;
            std::vector<string> pulses;
            std::vector<int>::iterator sit = smoothData.begin() + 3;
            it = data.begin() + 3;
            int pulseStart = -1 , pulsePeak = -1;
            int sum, wid, pigs = 0;
            bool isPulse = false;
            // BEGIN FINDING PULSES
            for (int k = 3; k < siz-3; ++k) {
                // pulse start
                if (vt < (sit[0] - sit[-2]) && !isPulse) {
                    // piggy back
                    if (k - pulsePeak <= pulseDelta && pulsePeak != -1) {
                        cout << "Found piggyback at: " << k << endl;
                        // calc how many points between peak and k are less than dropRatio * height
                        for (int l=pulsePeak; l < k; ++l)
                            if (it[l] < (dropRatio * data[pulsePeak])) pigs ++;
                        // if the number exceeds belowDropRatio, omit the first pulse
                        if (pigs > belowDropRatio) pulses.pop_back();
                    }
                    pulseStart = k;
                    isPulse = true;
                }
                // during pulse
                if (isPulse) {
                    sum += it[0];
                    wid++;
                }
                // end of pulse
                else if ((it[0] < it[-1] && isPulse) || wid >= width) {
                    sum -=it[0];
                    pulses.push_back(std::to_string(pulseStart) + " (" + std::to_string(sum) + ")");
                    cout << pulseStart << " (" << sum << ")" << endl;
                    pulseStart = -1;
                    pulsePeak = k-1;
                    sum, wid = 0;
                    isPulse = false;
                }
                sit++, it++;
            }
        }
    }
}