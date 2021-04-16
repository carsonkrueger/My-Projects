#include <iostream>
#include <fstream>
#include <iterator>
#include <algorithm>
#include "split.h"

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
int find_cust_idx(int);
int find_item_idx(int);
//GLOBAL VARIABLES
vector<std::vector<std::string>> orders_vec = {};
vector<std::vector<std::string>> items_vec = {};
vector<Customer> customers_vec = {};

//=======================Order=======================
class Order
{
    friend class LineItem;
    friend class Payment;

private:
    int order_id;
    std::string order_date;
    int cust_id;
    std::vector<LineItem> line_items;
    Payment *payment;

public:
    Order(int theOId, std::string theDate, int theCId, std::vector<LineItem> theItems) : order_id(theOId), order_date(theDate), cust_id(theCId), line_items(theItems){};
    //~Order();

    double total() {}

    std::string print_order() {}
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
    Customer(int theId, std::string theName, std::string theStreet, std::string theCity,
             std::string theState, std::string theZip, std::string thePhone, std::string theEmail)
        : cust_id(theId), name(theName), street(theStreet), city(theCity), state(theState),
          zip(theZip), phone(thePhone), email(theEmail){};
    // ~Customer()
    // {
    //     int id =
    // }
    std::vector<Order> cust_orders;
    int get_cust_id() const
    {
        return this->cust_id;
    }
    std::string print_detail(){};
};

//======================LineItem======================
class LineItem
{
private:
    int item_id;
    int qty;

public:
    LineItem(int theId, int theQty) : item_id(theId), qty(theQty){};
    //~LineItem();

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
    //~Item();
};

//======================Payment=====================
class Payment
{
private:
    double amount;

public:
    Payment(double amt) : amount(amt){};
    ~Payment();

    virtual std::string print_detail() const = 0;
};

//======================Credit=====================
class Credit : public Payment
{
private:
    std::string card_number;
    std::string expiration;

public:
    Credit(/* args */);
    ~Credit();

    std::string print_detail() {}
};

//======================PayPal=====================
class PayPal : public Payment
{
private:
    std::string paypal_id;

public:
    PayPal(/* args */);
    ~PayPal();

    std::string print_detail() {}
};

//======================WireTransfer=====================
class WireTransfer : public Payment
{
private:
    std::string bank_id;
    std::string account_id;

public:
    WireTransfer(/* args */);
    ~WireTransfer();

    std::string print_detail()
    {
        std::cout << "hi" << std::endl;
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
        }

        // for (const auto &ele : chunk)
        // //PRINTS EACH CHUNK TO SEE IF THEY CONTAIN CORRECT TEXT
        // {
        //     std::cout << ele << " ";
        // }

        int theId = std::stoi(chunk.at(0));
        std::string theName = chunk.at(1);
        std::string theStreet = chunk.at(2);
        std::string theCity = chunk.at(3);
        std::string theState = chunk.at(4);
        std::string theZip = chunk.at(5);
        std::string thePhone = chunk.at(6);
        std::string theEmail = chunk.at(7);

        Customer TheCustomer = Customer(theId, theName, theStreet, theCity, theState, theZip, thePhone, theEmail);
        customers_vec.push_back(TheCustomer);
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
        //std::cout << s << std::endl;
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
    std::vector<std::string> chunk;
    std::vector<std::string> temp;

    while (getline(ifs, s))
    {
        chunk = {}; // reset chunk
        temp = split(s, ',');
        for (const auto &ele : temp)
        {
            chunk.push_back(ele);
        }
        // for (const auto &ele : chunk) //PRINTS EACH CHUNK TO SEE IF THEY CONTAIN CORRECT TEXT
        // {
        //     std::cout << ele << " ";
        // }
        orders_vec.push_back(chunk);
    }
    ifs.close();
}

//-------------find_cust_idx---------------
int find_cust_idx(int cust_id)
{
    for (int i = 0; i < customers_vec.size(); i++)
    {
        // if (customers_vec[i].cust_id == cust_id)
        // {
        //     return i;
        // }
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

    std::ofstream ofs;
    ofs.open("order_report.txt");

    for (const auto &order : orders_vec) // for every order in the orders global vector
    {
        int theId = std::stoi(order[0]);
        for (const auto &cust : customers_vec) //for every customer in customers global vector
        {
            if (cust.get_cust_id() == theId) //if customer matches the order we are on
            {
                for (int j = 4; j < order.size(); j++) //loops thru items in orders global vec
                {
                    auto pair = split(order[j], '-');
                    int itemId = std::stoi(pair[0]);
                    for (const auto &itm : items_vec)
                    {
                        if (std::stoi(itm[0]) == itemId) //if item in orders vec matches an item in items.txt
                        {
                            Item theItem = Item(itemId, itm[1], std::stod(itm[2])); //creates new item
                            LineItem theLineItem = LineItem(itemId, std::stoi(pair[1]));
                        }
                    }
                }
                Order theOrder = Order(order[1], order[2], theId, order[3], );
                cust.cust_orders.push_back(theOrder);
            }
        }
        //ofs << order.print_detail();
    }
    ofs.close();

    return 0;
}
