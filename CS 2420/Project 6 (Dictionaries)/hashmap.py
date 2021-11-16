class HashMap:
    """HashMap class"""
    def __init__(self, cap=7, syze=0, dict=None) -> None:
        """init function"""
        self.cap = 7
        self.syze = 0
        self.dict = dict

        if dict is None:
            self.dict = [None] * self.cap

    def get(self, key):
        """Return the value for key if key is in the dictionary. If key is not in the
        dictionary, raise a KeyError."""
        if key not in self.dict:
            raise KeyError

        hash = self.find(key)
        return self.dict[hash][1]

    def set(self, key, value):
        """add the (key,value) pair to the hashMap. After adding, if the load-
        factor >= 80%, rehash the map into a map double its current capacity. For this project
        rehash when the load factor is >= 80%. new k = 2k-1.  """
        if key in self.dict:
            return
        
        # add key to dictionary
        hash = self.findEmpty(key)
        self.dict[hash] = (key,value)
        self.syze += 1

        if self.syze >= (.8 * self.cap):
            self.rehash()

    def findEmpty(self, key):
        hash = key % self.cap
        i = 2

        while self.dict[hash] is not None:
            # Finds empty location in hashmap
            hash += i
            i = i ** 2

            while hash >= self.cap:
                # If variable 'hash' goes out of bounds
                # take remainder and move it to beginning, as an index
                hash -= self.cap

        return hash

    def find(self, key):
        hash = key % self.cap
        i = 2

        while self.dict[hash][0] != key:
            hash += i
            i = i ** 2

            if hash >= self.cap:
                hash -= self.cap

        return hash

    def rehash(self):
        """Rebuild the hashmap after load facter exceeds 80%"""
        #print("CAP/SIZE:", self.cap, self.syze)
        temp = self.dict
        self.cap *= 2
        self.syze = 0
        self.dict = [None] * self.cap

        for tuple in temp:
            if tuple is not None:
                self.set(tuple[0], tuple[1])

    def remove(self, key):
        """Remove the key and its associated value from the map. If the key
        does not exist, nothing happens. Do not rehash the table after deleting keys. """
        if key not in self.dict:
            return

        hash = self.find(key)
        self.dict[hash] = None
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

        for x in self.dict:
            if x is not None:
                keys.append(x[0])

        return keys

def main():
    hm = HashMap()
    hm.set(2,265)
    hm.set(2,350)
    hm.set(2,201)
    hm.set(2, 69)
    hm.set(2,5)
    hm.set(3,419)
    print(hm.dict)
    print("capacity:", hm.cap)
    #print("keys:", hm.keys())

if __name__ == "__main__":
    main()
