import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [schermata, setSchermata] = useState('home');
  const [mano, setMano] = useState([]);
  const [errori, setErrori] = useState(0);
  const [cartaCorrente, setCartaCorrente] = useState(null);
  const [idUsati, setIdUsati] = useState([]);
  const [posScelta, setPosScelta] = useState(null);

  function inizia() {
    const start = prendiCarte([], 3);

    const arrayid = start.map((c) => c.id);

    const [nuova] = prendiCarte(arrayid, 1);

    setMano(start.sort((a, b) => a.sfiga - b.sfiga));

    setIdUsati([...arrayid, nuova.id]);

    setCartaCorrente(nuova);

    setErrori(0);

    setSchermata('gioco');
  }

  function conferma() {
    const ok =
      posScelta !== null && posizioneCorretta(mano, cartaCorrente, posScelta);

    if (ok) {
      const nuovaMano = [...mano, cartaCorrente].sort(
        (a, b) => a.sfiga - b.sfiga
      );

      setMano(nuovaMano);
      const [nuova] = prendiCarte(idUsati, 1);

      if (nuova) {
        setCartaCorrente(nuova);
        setPosScelta(null);

        setIdUsati([...idUsati, nuova.id]);
      }
    } else {
      const nuoviErrori = errori + 1;
      setErrori(nuoviErrori);

      if (nuoviErrori >= 3) {
        setSchermata('fine');
      }
    }
  }

  if (schermata === 'home') {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 20,
        }}>
        <Text>Gioco della Sfortuna</Text>

        <TouchableOpacity onPress={inizia}>
          <Text>Inizia</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (schermata === 'gioco') {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Carte: {mano.length}
          </Text>

          <Text>Errori: {errori}</Text>
        </View>

        {cartaCorrente && (
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 50 }}>{cartaCorrente.emoji}</Text>

            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
              {cartaCorrente.nome}
            </Text>

            <Text>Sfiga: ???</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={conferma}
          style={{
            backgroundColor: 'black',
            padding: 20,
            margin: 20,
          }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Conferma</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (schermata === 'fine') {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30 }}>💀 Hai perso</Text>

        <TouchableOpacity
          onPress={() => setSchermata('home')}
          style={{ marginTop: 20 }}>
          <Text>Ricomincia</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return null;
}

const CARTE = [
  {
    id: '1',
    nome: 'Il sedile storto',
    emoji: '🪑',
    sfiga: 2,
    desc: 'Il pilota si accorge che il sedile è fuori posizione e perde 3 secondi ai box.',
  },
  {
    id: '2',
    nome: 'Il granello traditore',
    emoji: '😣',
    sfiga: 4,
    desc: 'Un granello di gomma entra nel casco durante la partenza.',
  },
  {
    id: '3',
    nome: 'Il dado ballerino',
    emoji: '🔩',
    sfiga: 6,
    desc: 'Il volante vibra per un dado non stretto, il pilota finisce la gara con disagio.',
  },
  {
    id: '4',
    nome: 'Il DRS sonnolento',
    emoji: '📡',
    sfiga: 8,
    desc: 'Il DRS non si apre in rettilineo, si perde il sorpasso.',
  },
  {
    id: '5',
    nome: 'La pioggia puntuale',
    emoji: '🌧️',
    sfiga: 10,
    desc: 'Pioggia improvvisa quando la vettura ha appena montato le gomme da asciutto.',
  },
  {
    id: '6',
    nome: 'Il copricerchio in fuga',
    emoji: '🛞',
    sfiga: 12,
    desc: 'Il copricerchio cade alla partenza, nessun danno ma il team è imbarazzato.',
  },
  {
    id: '7',
    nome: "L'ospite nel casco",
    emoji: '🐜',
    sfiga: 14,
    desc: 'Una formica entra nel casco e distrae il pilota per due giri.',
  },
  {
    id: '8',
    nome: 'Il muto di Singapore',
    emoji: '🔇',
    sfiga: 16,
    desc: 'La radio si guasta per metà gara, il pilota non sente il muretto.',
  },
  {
    id: '9',
    nome: "L'uccello aerodinamico",
    emoji: '🐦',
    sfiga: 18,
    desc: 'Un uccello colpisce il muso e disturba leggermente il flusso aerodinamico.',
  },
  {
    id: '10',
    nome: 'Un giro di troppo',
    emoji: '⏱️',
    sfiga: 20,
    desc: 'Il team non riesce a cambiare strategia in tempo e si perdono 4 secondi.',
  },
  {
    id: '11',
    nome: 'La ghiaia del venerdì',
    emoji: '🪨',
    sfiga: 22,
    desc: 'Il pilota finisce in ghiaia nelle prove libere, il team si stresa.',
  },
  {
    id: '12',
    nome: "L'inciampo da 0.3",
    emoji: '🦶',
    sfiga: 24,
    desc: 'Un meccanico inciampa al pit stop, il pilota riparte con 0.3s di ritardo.',
  },
  {
    id: '13',
    nome: 'Il calore elettrico',
    emoji: '⚡',
    sfiga: 26,
    desc: 'Il MGU-K si spegne per 5 giri per surriscaldamento, si perde potenza.',
  },
  {
    id: '14',
    nome: 'La bandiera al momento sbagliato',
    emoji: '🏁',
    sfiga: 28,
    desc: 'Bandiera gialla doppia proprio durante il giro di qualifica più veloce.',
  },
  {
    id: '15',
    nome: 'I detriti della discordia',
    emoji: '💥',
    sfiga: 30,
    desc: 'Detriti in pista, il pilota rallenta e perde la posizione sul rivale.',
  },
  {
    id: '16',
    nome: 'Due giri fatali',
    emoji: '🔄',
    sfiga: 32,
    desc: 'Sosta sbagliata di 2 giri, si rientra con gomme sbagliate e si perde posizione.',
  },
  {
    id: '17',
    nome: "La foratura dell'ultimo metro",
    emoji: '🫧',
    sfiga: 34,
    desc: 'Foratura lenta nelle ultime 5 curve: da quarto a ultimo.',
  },
  {
    id: '18',
    nome: 'Le gomme di ghiaccio',
    emoji: '🥶',
    sfiga: 36,
    desc: 'Gomme fredde alla partenza, si perdono 1.5 secondi nel primo settore.',
  },
  {
    id: '19',
    nome: 'Hard quando non serve',
    emoji: '🔴',
    sfiga: 38,
    desc: 'Montato hard invece di medium, si rientra ai box perdendo 25 secondi.',
  },
  {
    id: '20',
    nome: 'Il vento del sorpasso',
    emoji: '💨',
    sfiga: 40,
    desc: 'Colpo di vento laterale durante il sorpasso, si va in ghiaia ma si rientra.',
  },
  {
    id: '21',
    nome: 'Il falso verde',
    emoji: '🚦',
    sfiga: 42,
    desc: 'Semaforo verde in ritardo, il pilota in pole brucia la partenza: drive-through.',
  },
  {
    id: '22',
    nome: "L'ala aperta per sempre",
    emoji: '✈️',
    sfiga: 44,
    desc: 'Il DRS resta aperto in curva, la vettura non è controllabile: ritiro.',
  },
  {
    id: '23',
    nome: 'La dieta forzata',
    emoji: '⛽',
    sfiga: 46,
    desc: 'Perdita di carburante, il pilota rallenta e perde due posizioni.',
  },
  {
    id: '24',
    nome: 'Il lento di troppo',
    emoji: '🐢',
    sfiga: 48,
    desc: 'Un doppiatino blocca il sorpasso: si perdono 4 secondi e la finestra di undercut.',
  },
  {
    id: '25',
    nome: 'Il testacoda involontario',
    emoji: '🌀',
    sfiga: 50,
    desc: 'Il volante si blocca in chicane, testacoda, si riparte ultimi.',
  },
  {
    id: '26',
    nome: 'La frizione arrostita',
    emoji: '🔥',
    sfiga: 52,
    desc: 'Frizione surriscaldata, si perdono 4 posizioni nel primo giro.',
  },
  {
    id: '27',
    nome: "La pietruzza nell'ingranaggio",
    emoji: '⚙️',
    sfiga: 54,
    desc: 'Una pietruzza rompe il compressore, ritiro dopo 30 giri.',
  },
  {
    id: '28',
    nome: 'I 5 secondi postumi',
    emoji: '⏳',
    sfiga: 56,
    desc: 'Penalità di 5 secondi post-gara: da terzo a quinto.',
  },
  {
    id: '29',
    nome: 'La marcia fantasma',
    emoji: '👻',
    sfiga: 58,
    desc: 'Guasto elettrico fa sbagliare marcia in frenata, il motore si rompe.',
  },
  {
    id: '30',
    nome: 'Il safety car puntuale',
    emoji: '🚗',
    sfiga: 60,
    desc: 'Il safety car rientra quando il pilota stava per attaccare con gomme fresche.',
  },
  {
    id: '31',
    nome: 'La visiera tradita',
    emoji: '😵',
    sfiga: 62,
    desc: 'Un detrito incrina la visiera, il pilota strappa lo strato sbagliato.',
  },
  {
    id: '32',
    nome: 'Il disco esploso',
    emoji: '💣',
    sfiga: 64,
    desc: 'Il freno anteriore esplode al giro 40 mentre si lottava per il podio.',
  },
  {
    id: '33',
    nome: 'Il traffico al rientro',
    emoji: '🚧',
    sfiga: 66,
    desc: 'Uscita dai box con traffico di doppiatini, si perdono 7 secondi.',
  },
  {
    id: '34',
    nome: 'Il dado cross-threadato',
    emoji: '🔧',
    sfiga: 68,
    desc: 'Pit stop da 11 secondi per un dado difettoso: la vittoria sfuma.',
  },
  {
    id: '35',
    nome: "Il punto dell'ape",
    emoji: '🐝',
    sfiga: 70,
    desc: "Un'ape punge il pilota durante una sosta, deve correre con dolore per 20 giri.",
  },
  {
    id: '36',
    nome: 'Doppia punizione',
    emoji: '😤',
    sfiga: 72,
    desc: 'Rimonta dalla pit lane fino al terzo, poi penalizzato di nuovo per unsafe release.',
  },
  {
    id: '37',
    nome: 'Il crollo nel caldo',
    emoji: '🏥',
    sfiga: 74,
    desc: 'Malore per il calore estremo, ritiro forzato.',
  },
  {
    id: '38',
    nome: 'Il millimetro proibito',
    emoji: '📏',
    sfiga: 76,
    desc: 'Fondo piatto irregolare di 0.5mm rilevato dopo la gara: squalifica.',
  },
  {
    id: '39',
    nome: 'La gomma a 300',
    emoji: '💀',
    sfiga: 78,
    desc: 'Foratura a tutta velocità, impatto con le barriere: pilota illeso ma ritiro.',
  },
  {
    id: '40',
    nome: 'Il primo giro rubato',
    emoji: '😡',
    sfiga: 80,
    desc: "Rivale distrugge l'ala anteriore alla prima curva: pit stop immediato, da primo a 18°.",
  },
  {
    id: '41',
    nome: 'Il motore a tre giri',
    emoji: '💔',
    sfiga: 82,
    desc: 'Motore rotto a 3 giri dalla fine con 20 secondi di vantaggio.',
  },
  {
    id: '42',
    nome: 'La bandiera a scacchi anticipata',
    emoji: '🏴',
    sfiga: 84,
    desc: 'Gara chiusa in anticipo prima del sorpasso decisivo.',
  },
  {
    id: '43',
    nome: 'Il congelamento crudele',
    emoji: '🥹',
    sfiga: 86,
    desc: 'Bandiera rossa durante il sorpasso per la vittoria, posizioni congelate.',
  },
  {
    id: '44',
    nome: 'Il giro di lancio muto',
    emoji: '⚰️',
    sfiga: 88,
    desc: 'Alternatore guasto nel giro di lancio, tutti i sistemi spenti: abbandono.',
  },
  {
    id: '45',
    nome: 'La penalità alla vittima',
    emoji: '😭',
    sfiga: 90,
    desc: 'Penalizzato per un contatto dove era lui la vittima: errore dei commissari.',
  },
  {
    id: '46',
    nome: 'La vite che cambia tutto',
    emoji: '🪛',
    sfiga: 92,
    desc: "Una vite fora lo pneumatico a 300 km/h all'ultimo giro: titolo perso.",
  },
  {
    id: '47',
    nome: 'La pole cancellata',
    emoji: '🚫',
    sfiga: 94,
    desc: 'Pole position annullata per temperatura gomme non conforme.',
  },
  {
    id: '48',
    nome: "Il fuoco del giro d'onore",
    emoji: '🔥',
    sfiga: 96,
    desc: "Motore in fiamme nel giro d'onore dopo aver vinto il mondiale.",
  },
  {
    id: '49',
    nome: 'I 0.5 millimetri fatali',
    emoji: '😱',
    sfiga: 98,
    desc: 'Vince la gara ma viene squalificato per 0.5mm di irregolarità al fondo.',
  },
  {
    id: '50',
    nome: "L'ultimo metro maledetto",
    emoji: '🤌',
    sfiga: 100,
    desc: "Titolo in tasca all'ultima curva, un rivale lo tampona: titolo a un terzo pilota.",
  },
];

function prendiCarte(idUsati, quante) {
  const disponibili = CARTE.filter((c) => !idUsati.includes(c.id));
  const mescolate = disponibili.sort(() => Math.random() - 0.5);
  return mescolate.slice(0, quante);
}

function posizioneCorretta(mano, cartaNuova, posizione) {
  const nuova = [...mano];
  nuova.splice(posizione, 0, cartaNuova);

  const i = nuova.indexOf(cartaNuova);

  const primaOk = i === 0 || nuova[i - 1].sfiga < cartaNuova.sfiga;
  const dopoOk =
    i === nuova.length - 1 || nuova[i + 1].sfiga > cartaNuova.sfiga;

  return primaOk && dopoOk;
}
