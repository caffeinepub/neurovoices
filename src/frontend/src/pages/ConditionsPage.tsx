import { Info, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const conditions = [
  {
    name: "ADHD",
    full: "Attention Deficit Hyperactivity Disorder",
    description:
      "A condition where a person finds it hard to focus, sit still, or control impulsive behavior. It is commonly diagnosed in children but can continue into adulthood.",
  },
  {
    name: "Agoraphobia",
    full: "",
    description:
      "An anxiety disorder where a person fears and avoids situations or places that might cause panic, helplessness, or embarrassment. It can sometimes make people afraid to leave their home.",
  },
  {
    name: "Alzheimer's Disease",
    full: "",
    description:
      "A brain disease that slowly destroys memory and thinking skills over time. It is the most common cause of dementia in older adults.",
  },
  {
    name: "Amnesia",
    full: "",
    description:
      "A condition involving significant memory loss, either of past events or the inability to form new memories. It can be caused by brain injury, trauma, or certain medical conditions.",
  },
  {
    name: "Anxiety Disorder",
    full: "",
    description:
      "A condition where a person feels excessive worry or fear that is difficult to control and interferes with daily life. It can cause physical symptoms like a racing heart or difficulty breathing.",
  },
  {
    name: "Apraxia",
    full: "",
    description:
      "A neurological disorder where a person has difficulty performing purposeful movements or tasks despite having the physical ability to do so. It is caused by damage to the parts of the brain that plan movement.",
  },
  {
    name: "ASD",
    full: "Autism Spectrum Disorder",
    description:
      "A developmental condition that affects how a person communicates, interacts with others, and experiences the world around them. It looks different in every person and ranges widely in severity.",
  },
  {
    name: "Bell's Palsy",
    full: "",
    description:
      "A sudden, temporary weakness or paralysis of the muscles on one side of the face, making it hard to smile, blink, or close an eye. It is caused by inflammation of the facial nerve and usually improves over time.",
  },
  {
    name: "Bipolar Disorder",
    full: "",
    description:
      "A mental health condition marked by extreme mood swings, including emotional highs (mania) and lows (depression). These episodes can affect energy, sleep, and the ability to think clearly.",
  },
  {
    name: "Body Dysmorphic Disorder",
    full: "BDD",
    description:
      "A mental health condition where a person obsessively focuses on a perceived flaw in their appearance that others may not notice at all. It causes significant distress and can interfere with daily life.",
  },
  {
    name: "Borderline Personality Disorder",
    full: "BPD",
    description:
      "A mental health condition characterized by intense emotions, unstable relationships, and difficulty managing feelings. People with BPD often fear abandonment and may have an unstable sense of identity.",
  },
  {
    name: "Cerebral Palsy",
    full: "CP",
    description:
      "A group of disorders affecting movement, muscle tone, and coordination caused by damage to the developing brain. It is usually present from birth and varies greatly in how it affects each person.",
  },
  {
    name: "Chronic Fatigue Syndrome",
    full: "CFS / ME",
    description:
      "A complex condition marked by extreme fatigue that does not improve with rest and worsens with physical or mental activity. Its exact cause is unknown and it can significantly impact daily functioning.",
  },
  {
    name: "Dementia",
    full: "",
    description:
      "An umbrella term for a group of symptoms affecting memory, thinking, and social abilities severely enough to interfere with daily life. It is not a single disease but a result of various brain conditions.",
  },
  {
    name: "Depression",
    full: "",
    description:
      "A mood disorder that causes persistent feelings of sadness, emptiness, and loss of interest in things once enjoyed. It can affect how a person thinks, feels, and handles everyday activities.",
  },
  {
    name: "Dissociative Identity Disorder",
    full: "DID",
    description:
      "A condition where a person develops two or more distinct personality states, often as a response to severe trauma. Each identity may have its own name, behavior, and memories.",
  },
  {
    name: "Down Syndrome",
    full: "",
    description:
      "A genetic condition caused by an extra chromosome 21 that affects physical and intellectual development. People with Down syndrome can lead fulfilling lives with appropriate support.",
  },
  {
    name: "Dyscalculia",
    full: "",
    description:
      "A learning difficulty that makes it hard to understand numbers, perform arithmetic, and grasp mathematical concepts. Like dyslexia, it is not related to overall intelligence.",
  },
  {
    name: "Dyslexia",
    full: "",
    description:
      "A learning difficulty that primarily affects reading and spelling by making it hard to connect letters to their sounds. It has nothing to do with intelligence and is very common.",
  },
  {
    name: "Dyspraxia",
    full: "Developmental Coordination Disorder (DCD)",
    description:
      "A condition that affects physical coordination, making everyday movements like writing, sports, or getting dressed more difficult. It can also impact organization and memory.",
  },
  {
    name: "Eating Disorders",
    full: "Anorexia, Bulimia, BED",
    description:
      "A group of serious mental health conditions involving unhealthy relationships with food, weight, and body image. They can have severe physical consequences and require professional treatment.",
  },
  {
    name: "Epilepsy",
    full: "",
    description:
      "A neurological disorder where the brain's electrical activity is disrupted, causing recurring seizures. Seizures can look very different from person to person.",
  },
  {
    name: "Fragile X Syndrome",
    full: "",
    description:
      "The most common inherited cause of intellectual disability and autism, caused by a change in a single gene. It can affect learning, behavior, and physical development.",
  },
  {
    name: "Huntington's Disease",
    full: "",
    description:
      "A genetic brain disorder that progressively breaks down nerve cells, affecting movement, thinking, and emotions. Symptoms usually appear in mid-adulthood and worsen over time.",
  },
  {
    name: "Hypersomnia",
    full: "",
    description:
      "A condition where a person feels excessively sleepy during the day despite getting enough sleep at night. It can interfere with work, social life, and general daily functioning.",
  },
  {
    name: "Insomnia",
    full: "",
    description:
      "A sleep disorder where a person has persistent trouble falling asleep, staying asleep, or getting restorative sleep. It can negatively impact mood, energy, and concentration.",
  },
  {
    name: "Migraine",
    full: "",
    description:
      "A neurological condition causing intense, recurring headaches often accompanied by nausea, vomiting, and sensitivity to light and sound. It can be debilitating and last for hours or even days.",
  },
  {
    name: "Multiple Sclerosis",
    full: "MS",
    description:
      "A disease where the immune system attacks the protective covering of nerves, disrupting communication between the brain and body. Symptoms vary widely and can include fatigue, vision problems, and difficulty walking.",
  },
  {
    name: "Narcissistic Personality Disorder",
    full: "NPD",
    description:
      "A personality disorder involving an inflated sense of self-importance, a deep need for admiration, and a lack of empathy for others. It often hides a fragile self-esteem that is vulnerable to criticism.",
  },
  {
    name: "Narcolepsy",
    full: "",
    description:
      "A sleep disorder causing overwhelming drowsiness and sudden attacks of sleep during the day, sometimes accompanied by sudden muscle weakness triggered by emotions. It significantly disrupts everyday life.",
  },
  {
    name: "OCD",
    full: "Obsessive-Compulsive Disorder",
    description:
      "A condition where a person experiences unwanted, repetitive thoughts (obsessions) and feels driven to perform certain actions (compulsions) to ease anxiety. It can be very disruptive to daily life.",
  },
  {
    name: "Panic Disorder",
    full: "",
    description:
      "A type of anxiety disorder where a person experiences sudden, repeated attacks of intense fear that peak within minutes. Physical symptoms like heart palpitations, sweating, and shortness of breath are common.",
  },
  {
    name: "Parkinson's Disease",
    full: "",
    description:
      "A nervous system disorder that affects movement, often causing tremors, stiffness, and slowed motion. It develops gradually and is more common in people over 60.",
  },
  {
    name: "Phobia",
    full: "",
    description:
      "An intense, irrational fear of a specific object, situation, or activity that poses little or no real danger. It can cause a person to go to great lengths to avoid the feared trigger.",
  },
  {
    name: "PTSD",
    full: "Post-Traumatic Stress Disorder",
    description:
      "A mental health condition triggered by experiencing or witnessing a traumatic event. It can cause flashbacks, nightmares, severe anxiety, and difficulty moving on from the event.",
  },
  {
    name: "Schizophrenia",
    full: "",
    description:
      "A serious mental disorder where a person may have trouble distinguishing what is real, often experiencing hallucinations or delusions. It requires long-term treatment and support.",
  },
  {
    name: "Social Anxiety Disorder",
    full: "",
    description:
      "An intense fear of social situations where a person worries about being judged, embarrassed, or humiliated. It goes beyond ordinary shyness and can prevent people from participating in everyday activities.",
  },
  {
    name: "Somatic Symptom Disorder",
    full: "",
    description:
      "A condition where a person experiences significant physical symptoms - such as pain or fatigue - that cannot be fully explained medically and cause great distress. The symptoms are real, even when no physical cause is found.",
  },
  {
    name: "Stroke",
    full: "",
    description:
      "A medical emergency that occurs when blood flow to part of the brain is cut off, causing brain cells to die quickly. Depending on which area of the brain is affected, it can impact speech, movement, or memory.",
  },
  {
    name: "Tourette Syndrome",
    full: "",
    description:
      "A neurological disorder characterized by repetitive, involuntary movements and vocalizations called tics. Symptoms usually begin in childhood and often improve with age.",
  },
  {
    name: "Traumatic Brain Injury",
    full: "TBI",
    description:
      "Damage to the brain caused by an external force such as a blow to the head, a fall, or an accident. The effects range from mild (a brief change in consciousness) to severe (long-term disability).",
  },
  {
    name: "Trichotillomania",
    full: "",
    description:
      "A mental health condition where a person feels a compulsive urge to pull out their own hair, often from the scalp, eyebrows, or eyelashes. It is related to OCD and can be managed with therapy.",
  },
  {
    name: "Williams Syndrome",
    full: "",
    description:
      "A rare genetic condition that causes developmental delays and learning difficulties alongside highly social, friendly personalities and strong verbal ability. People with Williams syndrome often have a remarkable affinity for music.",
  },
];

export function ConditionsPage() {
  const [search, setSearch] = useState("");

  const filtered = conditions.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.full.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-14 px-4 text-center bg-gradient-to-b from-secondary/40 to-background border-b border-border/60">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4">
            Conditions &amp; Disorders
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A plain-language guide to common neurological and mental health
            conditions - because understanding is the first step to empathy.
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative mb-6"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conditions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition"
          />
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex gap-3 items-start bg-muted/60 border border-border rounded-xl px-5 py-4 mb-10"
          data-ocid="conditions.panel"
        >
          <Info className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Note:</span> The
            descriptions below are simplified general explanations meant for
            basic awareness only. They are not medical definitions or diagnostic
            criteria. Please consult a healthcare professional for accurate
            information.
          </p>
        </motion.div>

        {/* Conditions Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No conditions found matching "{search}".
          </p>
        ) : (
          <div
            className="grid gap-4 sm:grid-cols-2"
            data-ocid="conditions.list"
          >
            {filtered.map((condition, i) => (
              <motion.div
                key={condition.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.03 }}
                data-ocid={`conditions.item.${i + 1}`}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-sm transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary font-bold text-xs">
                      {condition.name[0]}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-foreground text-base leading-snug">
                      {condition.name}
                      {condition.full ? (
                        <span className="block text-xs font-sans font-normal text-muted-foreground mt-0.5">
                          {condition.full}
                        </span>
                      ) : null}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                      {condition.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
