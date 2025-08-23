import json

consonants = ['b','c', 'd', 'f', 'g', 'h', 'j', 'k', 'l','m','n','p','r','s', 't', 'v', 'w', 'x', 'y', 'z']
vowels = ['a','e','i','o','u']
f = open("dictionary.json")
data = json.load(f)

dictionary = {}
for lst in data:
	dictionary[lst[0]] = lst[1]




for v in vowels:
	vowel_list = []
	for c1 in consonants:
		for c2 in consonants:
			word = c2+v+c1
			if word in dictionary:
				vowel_list.append(word)
	print(vowel_list)

