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
vector<vector<std::string>> customers_vec = {};

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
    Order(int theOId, std::string theDate, int theCId, std::vector<LineItem> theItems, Payment *thePayment) : order_id(theOId), order_date(theDate),
                                                                                                              cust_id(theCId), line_items(theItems), payment(thePayment){};
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
    std::vector<Order> cust_orders;

public:
    Customer(int theId, std::string theName, std::string theStreet, std::string theCity,
             std::string theState, std::string theZip, std::string thePhone, std::string theEmail, std::vector<Order> the_cust_orders)
        : cust_id(theId), name(theName), street(theStreet), city(theCity), state(theState),
          zip(theZip), phone(thePhone), email(theEmail), cust_orders(the_cust_orders){};
    // ~Customer()
    // {
    //     int id =
    // }
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
class Credit : public Payment //type 1
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
class PayPal : public Payment //type 2
{
private:
    std::string paypal_id;

public:
    PayPal(/* args */);
    ~PayPal();

    std::string print_detail() {}
};

//======================WireTransfer=====================
class WireTransfer : public Payment //type 3
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
        customers_vec.push_back(chunk);
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

    //for ever customer in global vec
    //check orders global vec if
    for (const auto &cust : customers_vec) //for every customer in customers global vector
    {
        std::vector<LineItem> line_items_temp = {};
        std::vector<Order> all_cust_orders_vec = {};
        int theCustId = std::stoi(cust[0]);
        std::string theName = cust.at(1);
        std::string theStreet = cust.at(2);
        std::string theCity = cust.at(3);
        std::string theState = cust.at(4);
        std::string theZip = cust.at(5);
        std::string thePhone = cust.at(6);
        std::string theEmail = cust.at(7);
        Payment pptr;
        for (const auto &order : orders_vec) // for every order in the orders global vector
        {
            int theOrderId = std::stoi(order[1]);
            std::string theDate = order[2];

            if (std::stoi(cust[0]) == theCustId)
            {
                if (order.size() >= 3) //IF order IS NOT PAYMENT (orders.txt contains payment line every other line)
                {
                    for (int j = 3; j < order.size(); j++) //loops thru items in orders global vec (4...n)
                    {
                        auto pair = split(order[j], '-'); //item-quantity pair, split by '-'
                        int itemId = std::stoi(pair[0]);
                        int itemQty = std::stoi(pair[1]);

                        for (const auto &itm : items_vec)
                        {
                            if (std::stoi(itm[0]) == itemId) //if item in orders vec matches an item in items.txt
                            {
                                std::string itemDescription = itm[1];
                                double itemPrice = std::stod(itm[2]);
                                Item theItem = Item(itemId, itemDescription, itemPrice); //creates new item
                                LineItem theLineItem = LineItem(itemId, itemQty);
                                line_items_temp.push_back(theLineItem);
                            }
                        }
                    }
                }
                else
                { //IF ORDER IS PAYMENT
                    std::string paymentType = order[0];
                    double amount = order;
                    if (paymentType == "1")
                    {
                        pptr = new Credit();
                    }
                    else if (paymentType == "2")
                    {
                        pptr = new PayPal();
                    }
                    else if (paymentType == "3")
                    {
                        pptr = new WireTransfer();
                    }
                }
            }
            Order theOrderObject = Order(theOrderId, theDate, theCustId, line_items_temp, pptr);
            all_cust_orders_vec.push_back(theOrderObject);
            //ofs << order.print_detail();
        }
        Customer TheCustomer = Customer(theCustId, theName, theStreet, theCity, theState, theZip, thePhone, theEmail, all_cust_orders_vec);
    }
    ofs.close();

    return 0;
}
