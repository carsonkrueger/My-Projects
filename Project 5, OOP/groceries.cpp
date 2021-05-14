#include <iostream>
#include <fstream>
#include <iterator>
#include <algorithm>
#include "split.h"

class Order;
class Customer;
class LineItem;
class Item;
class Payment;
class Credit;
class PayPal;
class WireTransfer;

//GLOBAL FUNCTIONS
void read_customers(std::string);
void read_items(std::string);
void read_orders(std::string);
void add_order_id_to_cust(int);
void create_customer(int, int);
int find_cust_idx(int);
int find_item_idx(int);
//GLOBAL VARIABLES
std::vector<Order> orders = {};
std::vector<Customer> customer_objs = {};
//Customer *customerObjects[];
std::vector<int> customers = {}; // keeps track of customers created
std::vector<std::vector<std::string>> items_vec = {};
std::vector<std::vector<std::string>> customers_vec = {};

//=======================Order=======================
class Order
{
    // friend class LineItem;
    // friend class Payment;

private:
    int order_id;
    std::string order_date;
    int cust_id;
    std::string print_string;
    // std::vector<LineItem> line_items;
    Payment *payment;

public:
    Order(int theOId, std::string theDate, int theCId, /*Payment pptr,*/ std::string printString /*std::vector<LineItem> theItems,*/) : order_id(theOId), order_date(theDate), cust_id(theCId), /*payment(pptr),*/ print_string(printString){};
    // ~Order()
    // {
    //     delete &order_id, &order_date, &cust_id; //, &line_items, payment;
    // };

    double total(){};

    std::string print_order()
    {

        //std::cout << "-----------------------------" << std::endl;
        std::string theString = "===========================\nOrder #" + std::to_string(order_id) + ", Date: " + order_date + "\n";
        theString += print_string;

        return theString;
    }
};

//======================Customer=====================
struct Customer
{
private:
    int cust_id;
    std::string name;
    std::string street;
    std::string city;
    std::string state;
    std::string zip;
    std::string phone;
    std::string email;

public:
    std::vector<int> cust_orders;

    Customer() : cust_id(0), name(""), street(""), city(""), state(""),
                 zip(""), phone(""), email(""), cust_orders({}){};

    Customer(int theId, std::string theName, std::string theStreet, std::string theCity,
             std::string theState, std::string theZip, std::string thePhone, std::string theEmail, int order_id)
        : cust_id(theId), name(theName), street(theStreet), city(theCity), state(theState),
          zip(theZip), phone(thePhone), email(theEmail), cust_orders({order_id}){};
    ~Customer()
    {
        delete &cust_id, &name, &street, &city, &state, &zip, &phone, &email;
        delete &cust_orders;
    }

    int get_cust_id() const
    {
        return cust_id;
    }
    std::string print_detail()
    {
        std::string theString = "Customer ID #" + std::to_string(cust_id) + ":\n";
        theString += name + ", ph. " + phone + ", email: " + email + "\n";
        theString += street + "\n";
        theString += city + ", " + state + zip;
        return theString;
    };
};

//======================LineItem======================
class LineItem
{
    //friend class Order;

private:
    int item_id;
    int qty;
    std::string desc;
    double pri;

public:
    LineItem(int theId, int theQty, string description, double price) : item_id(theId), qty(theQty), desc(description), pri(price){};
    ~LineItem()
    {
        delete &item_id, &qty, &desc, &pri;
    };

    double sub_total(){};
};

//========================Item=======================
struct Item
{
private:
    int item_id;
    std::string description;
    double price;

public:
    Item(int theItemId, std::string theDescription, double thePrice) : item_id(theItemId), description(theDescription), price(thePrice){};
    ~Item()
    {
        delete &item_id, &description, &price;
    };
};

//======================Payment=====================
class Payment
{
    //friend class Order;

private:
    double amount;

public:
    Payment(double amt = 0) : amount(amt){};
    virtual ~Payment()
    {
        delete &amount;
    };

    virtual std::string print_detail()
    {
        std::string theString = "Hi"; //" Amount: " + std::to_string(amount); //std::to_string(get_amount());
        return theString;
    }
};

//======================Credit=====================
class Credit : public Payment //type 1
{
private:
    std::string card_number;
    std::string expiration;

public:
    Credit(std::string the_card_number, std::string theExpiration) : card_number(the_card_number), expiration(theExpiration){};
    ~Credit()
    {
        delete &card_number, &expiration;
    }

    std::string print_detail() override
    {
        std::string theString = Payment::print_detail();
        theString += ", Paid by Credit card " + this->card_number + ", exp. " + this->expiration + "\n";
        return theString;
    }
};

//======================PayPal=====================
class PayPal : public Payment //type 2
{
private:
    std::string paypal_id;

public:
    PayPal(std::string the_paypal_id) : paypal_id(the_paypal_id){};
    ~PayPal()
    {
        delete &paypal_id;
    };

    std::string print_detail()
    {
        std::string theString = Payment::print_detail();
        theString += ", Paid by Paypal ID: " + this->paypal_id;
        return theString;
    }
};

//======================WireTransfer=====================
class WireTransfer : public Payment //type 3
{
private:
    std::string bank_id;
    std::string account_id;

public:
    WireTransfer(std::string the_bank_id, std::string the_account_id) : bank_id(the_bank_id), account_id(the_account_id){};
    ~WireTransfer()
    {
        delete &bank_id, &account_id;
    };

    std::string print_detail()
    {
        std::string theString = Payment::print_detail();
        theString += ", Paid by Wire transfer fromBank ID " + this->bank_id + ", Account# " + this->account_id;
        return theString;
    }
};

//-------------------read_customers------------------
void read_customers(std::string theFile)
{
    std::ifstream ifs;
    ifs.open(theFile);
    std::string s;
    std::vector<std::string> chunk;
    std::vector<std::string> temp;

    while (getline(ifs, s))
    {
        chunk = {}; // reset chunk
        temp = split(s, ',');
        for (const auto &ele : temp) // FOR EACH CUSTOMER INFO, ON EACH LINE ...
        {
            chunk.push_back(ele); //SAVE IT TO CHUNK
            //std::cout << ele << " ";
        }
        //std::cout << std::endl;
        customers_vec.emplace_back(chunk);
    }
    ifs.close();
}

//-------------------read_items------------------
void read_items(std::string theFile)
{
    std::ifstream ifs;
    ifs.open(theFile);
    std::string s;
    std::vector<std::string> chunk;

    while (getline(ifs, s))
    {
        chunk = {};
        auto fields = split(s, ',');
        for (const auto &fld : fields)
        {
            //std::cout << fld << std::endl;
            chunk.push_back(fld);
        }
        items_vec.push_back(chunk);
        // for (const auto &ele : chunk)
        // //PRINTS EACH CHUNK TO SEE IF THEY CONTAIN CORRECT TEXT
        // {
        //     std::cout << ele << " ";
        // }
    }
    ifs.close();
}

//-------------------read_orders------------------
void read_orders(std::string theFile)
{
    std::ifstream ifs;
    ifs.open(theFile);
    std::string s;
    std::vector<std::string> order = {};

    while (getline(ifs, s)) //FOR EACH LINE IN orders.txt
    {
        std::string theString = "Order Detail:\n";
        order = split(s, ',');
        std::vector<std::vector<std::string>> full_order = {};
        double total = 0;

        for (int i = 3; i < order.size(); i++) //EXTRACTS ITEMS FROM ORDER LINE
        {

            std::vector<std::string> pair = split(order.at(i), '-');
            //std::cout << pair.at(0) << " " << pair.at(1) << " ";
            for (const auto &item : items_vec)
            {
                if (pair.at(0) == item.at(0)) //IF current item is in global items_vec
                {
                    //std::cout << pair.at(0) << " ";
                    theString += "\tItem " + pair.at(0) + ": " + item.at(1) + ", " + pair.at(1) + " @ " + item.at(2) + "\n";
                    total += std::stod(pair.at(1)) * std::stod(item.at(2));
                }
            }
        }

        int CustId = std::stoi(order.at(0));
        int OrderId = std::stoi(order.at(1));
        std::string Date = order.at(2);

        getline(ifs, s);
        order = split(s, ',');
        std::string secondString = "Amount: $" + std::to_string(total) + ", ";
        std::string paymentType = order.at(0);
        //Payment *pptr = new Payment(total);

        if (paymentType == "1")
        {
            //*pptr = Credit(order.at(1), order.at(2));
            secondString += "Paid by Credit Card " + order.at(1) + ", exp. " + order.at(2) + "\n\n";
        }
        else if (paymentType == "2")
        {
            //*pptr = PayPal(order.at(1));
            secondString += "Paid by PayPal ID: " + order.at(1) + "\n\n";
        }
        else if (paymentType == "3")
        {
            //*pptr = WireTransfer(order.at(1), order.at(2));
            secondString += "Paid by Wire transfer from Bank ID " + order.at(1) + ", Account # " + order.at(2) + "\n\n";
        }

        int idx;
        for (int i = 0; i < customers_vec.size(); i++)
        {
            int temp = std::stoi(customers_vec.at(i).at(0));
            //std::cout << temp << " ";
            if (temp == CustId)
            {
                idx = i;
                break;
            }
        }

        secondString += "Customer ID #" + std::to_string(CustId) + ":\n";
        secondString += customers_vec[idx][1] + ", ph. " + customers_vec[idx][6] + ", email: " + customers_vec[idx][7] + "\n";
        secondString += customers_vec[idx][2] + "\n";
        secondString += customers_vec[idx][3] + ", " + customers_vec[idx][4] + " " + customers_vec[idx][5] + "\n\n";

        // for (int j = 0; j <= customers.size(); j++)
        // {
        //     if (j == customers.size())
        //     {
        //         customers.push_back(CustId);
        //         //create_customer(CustId, OrderId); <------ BUGGED -------
        //         //std::cout << customers.size() << " " << CustId << std::endl;
        //         break;
        //     }
        //     else if (customers.at(j) == CustId)
        //     {
        //         //ADD ME -> add orderId to customer vector of orders

        //         break;
        //     }
        // }

        secondString += theString;
        //std::cout << theString << std::endl;
        Order theOrderObject = Order(OrderId, Date, CustId, /*pptr,*/ secondString);
        orders.emplace_back(theOrderObject);
    }
    ifs.close();
}

//-----------add_order_id_to_cust----------
void add_order_id_to_cust(int OrderId)
{
}

//-------------create_customer-------------
void create_customer(int CustId, int OrderId)
{
    int idx = find_cust_idx(CustId);
    //std::cout << CustId << customers_vec[idx][1] << customers_vec[idx][2] << customers_vec[idx][3] << customers_vec[idx][4] << customers_vec[idx][5] << customers_vec[idx][6] << customers_vec[idx][7];
    //Customer customer = Customer(CustId, customers_vec[idx][1], customers_vec[idx][2], customers_vec[idx][3], customers_vec[idx][4], customers_vec[idx][5], customers_vec[idx][6], customers_vec[idx][7], OrderId);
    //customerObjects.push_back(customer);
}

//-------------find_cust_idx---------------
int find_cust_idx(int cust_id)
{
    for (int i = 0; i < customers_vec.size(); i++)
    {
        int temp = std::stoi(customers_vec.at(i).at(0));
        //std::cout << temp << " ";
        if (temp == cust_id)
        {
            return i;
        }
    }
}

//-------------find_item_idx---------------
int find_item_idx(int item_id)
{
    for (int i = 0; i < items_vec.size(); i++)
    {
        if (std::stoi(items_vec[i][0]) == item_id)
        {
            return i;
        }
    }
}

//------------------MAIN------------------
int main()
{
    read_customers("customers.txt");
    read_items("items.txt");
    read_orders("orders.txt");
    //std::cout << "-got to here" << std::endl;

    std::ofstream ofs;
    ofs.open("order_report.txt");

    for (auto &order : orders)
    {
        //std::cout << order.print_order() << std::endl;
        ofs << order.print_order() << std::endl;
    }

    ofs.close();
}
