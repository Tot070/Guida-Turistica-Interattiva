# Crea un programma che simuli un semplice elenco di cose da fare. L’utente può aggiungere,
# visualizzare e rimuovere elementi dalla lista. La lista dovrebbe essere salvata in un file.


with open("todo.txt", "r") as file:
    lista = [riga.strip() for riga in file]

while True:
    print("\n1. Mostra lista")
    print("2. Aggiungi elemento")
    print("3. Rimuovi elemento")
    print("4. Esci")

    scelta = input("Scegli un'opzione: ")

    if scelta == "1":
        if not lista:
            print("La lista è vuota.")
        else:
            for i, item in enumerate(lista):
                print(f"{i + 1}. {item}")

    elif scelta == "2":
        elemento = input("Scrivi una cosa da fare: ")
        lista.append(elemento)
        print("Aggiunto alla lista.")

    elif scelta == "3":
        if not lista:
            print("La lista è vuota.")
        else:
            for i, item in enumerate(lista):
                print(f"{i + 1}. {item}")
            numero = input("Numero da rimuovere: ")
            if numero.isdigit():
                numero = int(numero)
                if 1 <= numero <= len(lista):
                    rimosso = lista.pop(numero - 1)
                    print(f"'{rimosso}' è stato rimosso.")
                else:
                    print("Numero non valido.")
            else:
                print("Inserisci un numero valido.")

    elif scelta == "4":
        # Salva la lista nel file prima di uscire
        with open("todo.txt", "w") as file:
            for item in lista:
                file.write(item + "\n")
        print("Lista salvata. Ciao!")
        break

    else:
        print("Scelta non valida.")
