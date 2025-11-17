Yesterday I saw an Inuit exhibition at the Montreal Science Museum. I really like the Inuit letters because its geometric shapes have a unique beauty. At a book fair, I bought a book wrote by Inuktitut words. Although I can't understand a single word, seeing these symbols connected together gives me a wonderful and pleasant feeling, and I can't help but want to learn more.

So yesterday I thought, why not learn a little now? I looked up some information and wanted to learn basic conversation. I learned "hello." This word is so concise and beautiful in Inuktitut, ᐊᐃ’, I think I'll never forget it. But the other words, they look much longer. I found that they are much longer than Chinese sentences. I played around with Bing Translate for a while. I started to imagine whether I could build my own Inuit-to-Chinese translator. Although Bing Translate already has this function, I wanted to understand what challenges I would encounter if I did it myself.After a brief investigation, I found that translating Inuit directly into Chinese is too difficult due to its very low resource language. Therefore, I adjusted my goal to first develop an Inuit-English translator. There are some research resources available for this, which are much easier to access than for Chinese.

During my research, I discovered that the significant grammatical differences between Inuktitut and English presented considerable challenges in building the translator. I'm documenting these challenges here:

# Challenge 1: A Single Inuktitut Word Often Encodes a Full English Sentence (Polysynthesis)

Inuktitut is a classic polysynthetic language. A single word can incorporate a root and many stacked suffixes, forming what is essentially a compressed mini-sentence.  
Wikipedia notes that a single Inuktitut word may contain *seven or more* suffixes, and that over *90% of word forms appear only once* in corpora due to morphological explosion.

### Example 
qangatasuukkuvimmuuriaqalaaqtunga
├─ qangatasuukkuvik (airport)
├─ -mmu (to/toward)
├─ -uriaq (must/need)
├─ -qalaa (about to)
└─ -qtunga (I)

English: "I will probably have to go to the airport."

Because English words are relatively stable semantic units and Inuktitut “words” are dynamic morphological aggregates, standard BPE tokenizers fragment Inuktitut into dozens of pieces. This destroys morpheme boundaries and makes it difficult for a model to reconstruct the semantics and grammatical structure behind each long word. Tokenization, alignment, and meaning extraction all become significantly harder.

---

# Challenge 2: Inuktitut Has Three Grammatical Numbers (Singular / Dual / Plural)

English distinguishes only singular and plural.  
Inuktitut, however, grammatically distinguishes:

- **singular (1)**  
- **dual (2)**  
- **plural (3+)**

Both nouns and verbs must mark number explicitly.

Example:

ikajuuk = "they two help each other"

English never indicates whether “they” refers to two or many participants, but Inuktitut morphology requires this information.  
Thus, English→Inuktitut MT must infer number that is not overtly present in the source sentence. Mistakes in number lead to incorrect verb agreement, making the entire sentence ungrammatical.

---

# Challenge 3: A Rich Case System Precisely Encodes Spatial and Semantic Relations

English relies on ambiguous prepositions like “in”, “from”, “with”, “like”.  
Inuktitut instead uses a large and precise system of **case suffixes**.  
Wikipedia lists cases such as locative (in/at), allative (toward), ablative (from), instrumental (using), prolative (via), equative (like), and many others.

### Illustration

English → in / from / toward / with / like

Inuktitut → -mi / -min / -mut / -ngani / -llu ...

Where English prepositions leave room for multiple interpretations (“with” can mean accompaniment, instrument, association, etc.), Inuktitut requires explicit case distinctions. During MT, the model must determine the exact semantic role implied by the English preposition and choose the appropriate case suffix—something English does not explicitly encode.

---

# Challenge 4: The Split-Ergative System and Verb Classes Complicate Role Marking

Inuktitut uses a **split-ergative** alignment system.  
This means the marking of “who does what” depends on verb class and transitivity rather than fixed subject–object roles as in English.

Wikipedia also describes **specific verbs** (for actions with a definite object) and **non-specific verbs** (for actions without a definite object):

- If the action has a definite object → specific verb → subject marked with ergative case.  
- If the action lacks a definite object → non-specific verb → subject not marked ergative.

### Example Pair

ju umiarlirpuq
= "he is building a (specific) boat"

Here the boat is a definite object, so the verb belongs to the specific class.

ju umiarlirniqtuq
= "he is boat-building" (object not specified)

In this case the activity is general and the verb is non-specific.

Because English expresses both with the same verb “build”, MT must determine whether the object is definite or not, select the correct verb class, and assign correct case marking. The model cannot rely on English word order alone; it must infer grammatical roles from meaning.

---

# Challenge 5: Verbal Morphology Encodes Mood, Evidentiality, and Speaker Attitude

Inuktitut verbal suffixes encode tense, aspect, mood, evidentiality, and speaker stance.  
Evidentiality refers to how the speaker knows something—directly, by hearsay, by inference, or by assumption.  
English does not encode these distinctions morphologically.

Example:


takujunnaqtunga

This does not merely mean “I can’t see it.”  
It implies:

- I tried  
- I failed  
- I still cannot see it  
- There is some frustration or resignation in the speaker’s tone

Since English does not provide this information, English→Inuktitut translation must supply missing elements, selecting suffixes that match the intended attitude, evidence source, and event state. This introduces an unavoidable layer of semantic reconstruction.

---

# Challenge 6: Clause Relations Are Encoded in Verb Suffixes, Not Conjunctions

English expresses subordination with conjunctions such as “because”, “when”, “if”, and “although”.  
Inuktitut instead encodes these clause relations *morphologically* inside the verb.

Example:

pisuk-sima-mmam-nga
= "because he walked, I suppose"

“-mmam” expresses “because”, and the entire verb also encodes completion and inference.  
Thus, multiple clause relations may appear within one verb, making English syntactic structures incompatible with Inuktitut morphological structures. MT must identify clause types in English and generate the appropriate sequence of suffixes—a mapping far more complex than surface-level word substitution.

---

# Summary

Viewed together, these challenges reveal that English and Inuktitut differ at virtually every structural level. Inuktitut words are morphologically dense, often encoding what English expresses across entire phrases. Its number system requires explicit dual marking, a category English lacks. Its case system is fine-grained and semantically precise, whereas English relies on ambiguous prepositions. The split-ergative system and the distinction between specific and non-specific verbs reshape how grammatical roles are expressed. Verbal morphology embeds information about mood, evidentiality, and event structure that English leaves implicit. Finally, clause relations that English expresses syntactically must be encoded as verb suffixes in Inuktitut.

Therefore, English-Inuit machine translation systems must not only translate words, but also reconstruct semantic distinctions, generate correct lexical chains, and coordinate different grammatical structures. English-Inuit machine translation is far more challenging than ordinary language pairings. 

Resources:  
https://en.wikipedia.org/wiki/Inuit_grammar  
https://en.wikipedia.org/wiki/Inuit
https://zh.wikipedia.org/wiki/%E4%BC%8A%E5%8A%AA%E5%85%8B%E6%8F%90%E5%9C%96%E7%89%B9%E8%AA%9E

