#!/usr/bin/env python
# encoding: utf-8


def countSingle():
    red = {}
    blue = {}
    with open('lottery_pure.txt', 'rt') as f:
        for line in f:
            for i in line.split()[:-1]:
                if i not in red:
                    red[i] = 1
                else:
                    red[i] = red[i] + 1
            j = line.split()[-1]
            if j not in blue:
                blue[j] = 1
            else:
                blue[j] = blue[j] + 1

    count = 0
    for k in sorted(red, key=red.get, reverse=True):
        print(k, red[k], sep='-', end='  ')
        count += 1
        if count % 8 == 0:
            print()

    print("\n-------------------")
    count = 0
    for k in sorted(blue, key=blue.get, reverse=True):
        count += 1
        print(k, blue[k], sep='-', end='  ')
        if count % 8 == 0:
            print()
    print()


def countWhole():
    whole = {}
    with open('lottery_pure.txt', 'rt') as f:
        for line in f:
            s = line.strip()
            if s not in whole:
                whole[s] = 1
            else:
                whole[s] += 1

    for k in sorted(whole, key=whole.get, reverse=True):
        print(k, whole[k], sep='-', end='  ')
    # print(whole)


countSingle()
# countWhole()
