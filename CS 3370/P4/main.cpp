#include <iostream>
#include <fstream>
#include <vector>
#include <array>
#include <iterator>
#include <string>
#include <filesystem>
#include <numeric>
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
        if (p.path().extension() == ext) datFiles.push_back(p.path().string());
    
    for(int i = 1; i < argc; ++i){ // for each ini file
        std::ifstream iniFile(argv[i]);
        double vt = -1, width = -1, pulseDelta = -1, dropRatio = -1, belowDropRatio = -1;
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
                    break;
                }
                var = "";
            }
            else if (ch == '#') { // Comments in ini file
                std::getline(iniFile, var);
                var = "";
            }
            else var.push_back(ch);
        }
        
        if (vt == -1 || width == -1 || pulseDelta == -1 || dropRatio == -1 || belowDropRatio == -1) {
            cout << "Invalid INI file: missing one or more properties" << endl;
            continue;
        }

        cout << vt << " " << width << " " << pulseDelta << " " << dropRatio << " " << belowDropRatio << endl;

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
                if (k == 0 || k == 1 || k == 2 || k == siz || k == siz-1 || k == siz-2) smoothData.push_back(it[0]);
                else smoothData.push_back((it[-3] + 2*it[-2] + 3*it[-1] + 3*it[0] + 3*it[1] + 2*it[2] + it[3]) / 15);
                it ++;
            }

            cout << smoothData[0] << " " << smoothData[1] << " " << smoothData[2] << endl;

            cout << endl << datFiles[j] << ":" << endl << endl;
            std::vector<int> pulses;
            std::vector<int> peaks;
            std::vector<int>::iterator sit = smoothData.begin();
            it = data.begin();
            int pulseStart = -1, pulsePeak = -1;
            int betweens = 0;
            bool inPulse = false;

            // dectect pulses and peaks
            for (size_t k=0; k+2 < siz; ++k) {
                if (vt < (sit[2] - sit[0]) && !inPulse) {
                    cout << "FOUND A PULSE: " << k << endl;
                    pulses.push_back(k);
                    inPulse = true;
                }
                else if (sit[1] < sit[0] && inPulse) {
                    peaks.push_back(k);
                    inPulse = false;
                }
                sit++, it++;
            }
            // detect piggybacks
            for (size_t k=0; k+1 < pulses.size(); ++k) {
                // found a pulse following a pulse within pulseDelta positions
                if (pulses[k+1]-pulses[k] < pulseDelta) {
                    cout << "checking from peak: " << peaks[k]+1 << ", to pulse start: " << pulses[k+1] << endl;
                    // find the # between the peak and next pulse that are less than the peak height * dropRatio
                    for (size_t l=peaks[k]+1; l < pulses[k+1]; ++l)
                        if (data[l] < data[peaks[k]] * dropRatio) ++betweens;
                    // if the number between is greater than belowDropRatio, omit the pulse
                    if (betweens > belowDropRatio) { cout << "Piggyback found, discard: " << pulses[k] << endl;} //erase pulse from vec here
                }
                betweens = 0;
            }
            // accumulate width spaces, or until start of next pulse. Cout the sum
            for (auto p: pulses) cout << "pulse: " << p << endl;
            // for (size_t k=0; k<pulses.size(); ++k) {
            //     int sum = 0, wid = 0;
            //     int pos = pulses[k];
            //     cout << "pulse: " << pulses[k];
            //     while (pos < pulses[k+1] && wid <= width) {
            //         sum += data[pos];
            //         ++pos, ++wid;
            //     }
            //     cout << " (" << sum << ")" << endl;
            // }
        }
    }
}