"""This Module contains the HashMap class"""

class HashMap:
    """HashMap class"""
    def __init__(self) -> None:
        """init function"""
        self.cap = 7
        self.syze = 0
        self.dict = [None] * self.cap


    def get(self, key):
        """Return the value for key if key is in the dictionary. If key is not in the
        dictionary, raise a KeyError."""
        # for x in range(self.syze-1):
        #     if self.dict[x][0] == key:
        #         break
        #     elif x == self.size()-1:
        #         raise KeyError

        hach = self.find(key)
        return self.dict[hach][1]

    def set(self, key, value):
        """add the (key,value) pair to the hachMap. After adding, if the load-
        factor >= 80%, rehach the map into a map double its current capacity. For this project
        rehach when the load factor is >= 80%. new k = 2k-1.  """
        try:
            # modify key's value
            hach = self.find(key)
            self.dict[hach] = (key, value)

        except KeyError:
            # add key to dictionary
            hach = self.find_empty(key)
            self.dict[hach] = (key,value)
            self.syze += 1

            if self.syze >= (.8 * self.cap):
                self.rehach()

    def find_empty(self, key):
        """Finds and returns the first empty bucket hach value"""
        #hach = key % self.cap
        hach = (key[0] + key[1]) % self.cap
        i = 1

        while self.dict[hach] is not None:
            # Finds empty location in hachmap
            hach += i ** 2
            i += 1

            while hach >= self.cap:
                # If variable 'hach' goes out of bounds
                # take remainder and move it to beginning, as an index
                hach -= self.cap

        return hach

    def find(self, key):
        """Finds and returns the hach value of the given key"""
        hach = (key[0] + key[1]) % self.cap
        i = 1

        while self.dict[hach] is not None:
            if self.dict[hach][0] == key:
                return hach

            hach += i ** 2
            i += 1

            while hach >= self.cap:
                hach -= self.cap

            if i >= 100000:
                raise KeyError
        raise KeyError # self.dict[hach] == None

    def rehach(self):
        """Rebuild the hachmap after load facter exceeds 80%"""
        #print("CAP/SIZE:", self.cap, self.syze)
        temp = self.dict
        self.cap = (self.cap * 2) - 1
        self.syze = 0
        self.dict = [None] * self.cap

        for tupl in temp:
            if tupl is not None:
                self.set(tupl[0], tupl[1])

    def remove(self, key):
        """Remove the key and its associated value from the map. If the key
        does not exist, nothing happens. Do not rehach the table after deleting keys. """
        # for x in range(self.syze-1):
        #     if self.dict[x][0] == key:
        #         break
        #     elif x == self.size()-1:
        #         return

        hach = self.find(key)
        # del self.dict[hach]
        self.dict[hach] = None
        self.syze -= 1

    def clear(self):
        """empty the HashMap """
        self.cap = 7
        self.dict = [None] * self.cap
        self.syze = 0

    def capacity(self):
        """Return the current capacity--number of buckets--in the map. """
        return self.cap

    def size(self):
        """Return the number of key-value pairs in the map. """
        return self.syze

    def keys(self):
        """Return a list of keys. """
        keys = []

        for i in self.dict:
            if i is not None:
                keys.append(i[0])

        return keys

# def main():
#     hm = HashMap()
#     #hm.get((0,0))

#     keys = [(r,r) for r in (range(10))]
#     values = list(range(1, 11))

#     for k,v in zip(keys,values):
#         hm.set(k,v)

#     hm.get((5,5))
#     hm.get((9,9))
#     hm.set((2,2), 409)
#     hm.get((2,2))

#     print(hm.dict)
#     print("capacity:", hm.cap)
#     #print("keys:", hm.keys())

# if __name__ == "__main__":
#     main()
