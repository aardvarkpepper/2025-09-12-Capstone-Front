## Notes

Calculations are performed assuming a rules framework similar to the 1942 Second Edition Axis and Allies board game ruleset.

## Calculation

### Units of a Single Type

User inputs or modifies data.  Operations are performed on that data to look up or calculate probability distributions.

At the base level (n units of a single type, each with hit probability p), the binomial probability distribution is used.

Where n = number of events, r = total number of successful events, p = probability of success single trial, 1-p = probability failure,

(n! / r! (n-r)!) * (p ^ r) * ((1-p) ^ (n-r))

### Units of Multiple Types

Where units of multiple types are present, they are divided into groups according to special characteristics (e.g. submarines can never hit air).  Some characteristics are activated depending on current composition (e.g. air can hit submarines if a destroyer is present); such units are divided according to composition.

Where a group of multiple types shares characteristics (except the to-hit of each type), convolution is used to calculate combined probability distribution.

### Handling of Assumption of Not Retreating if No Hits

If all attackers and all defenders miss, the algorithm repeats the round, though in theory the attacker has the option to retreat.  The user may use a custom trigger to auto-retreat or to allow the option to retreat.

The default repetition of a round is based on - if the attacker decided to attack in the first place (whether initiating or choosing not to retreat at end of previous sub-round), conditions have not changed, so whatever reasons the attacker had for initiating/staying still apply.

There are sub-cases that involve wanting the defender to have hit with antiaircraft guns, so the attacker would indeed retreat if no hits scored on either side.  These can be handled using user-specified special triggers.

Where an attacker fails to get any hits using naval bombardment, conditions have changed, and the program may trigger a retreat.  The initial attack was carried out with certain expectations of utility and probability distributions.  Getting no naval bombard hits is adverse for the attacker, lowering expected utility and altering probability distributions, possibly triggering a retreat.

### Order of Loss

Order of loss is altered based on script that can be altered and/or customized by user.

For example, an attacker might send a lot fewer attackers than they could have potentially sent on an attack.  If the defender faced overwhelming force, they would submerge subs, if not, they would not submerge subs.  This sort of decision making is natural in board game play, but not accounted for in current implementations of Axis and Allies calculators, or 1942 Online's defensive profiles.

### User Interface and Outputs

Before confirming an attack, a user may view expected payout / probability distribution, expressed over time, accounting for unit differentiation, with viewable branches by sub-tree.

For example, a user may view expected results from round 1, 2, 3, or for finishing a battle, with table, pie, bar, and area chart outputs (among others).  They may also view future expectations based on a selected current round result.  e.g. viewing the probability defending antiaircraft get no hits, and viewing the expected payouts and probability distributions if that's the case, or viewing the probability a defending sub gets a hit, and future expectations, etc.  Expectation of current and future rounds are viewable on a data visualization (don't know the name) showing expected results over time.

When a round's outcome is known, that changes future expected results.  The original expected payouts and probability distributions can be compared to new expected payouts and probability distributions.

### Utility Calculations Between Rounds, Retreats, and Output

The default value of a unit is its cost, but this is not accurate to utility.  The user can change the base default value, specify a unit's value for a particular scenario or under particular circumstances.  The user may also create additional custom utility triggers.

e.g. in a battle, a user values a single fighter surviving at +11, as they value their fighter more than the default cost of 10.  However, they value two fighters surviving at +34, as if a second fighter survives, it may be used in an attack on a capital where the second fighter has high marginal utility.

Retreat decisions and changing of order of loss are determined by utility calculations.  The attacker is advised based on the program's assessment of probable outcomes; the defender's order of loss is changed based on the program's assumptions of what the optimal defender of loss is.

As ever, the defender may use a trigger to manually assign casualties, or switch order of loss based on specified conditions.

### 'True' Output, Monte Carlo, and Markov Chains

'Monte Carlo' simulations run a great number of random simulations and add up the results.  Typically games based on rulesets similar to Axis and Allies effectively have battles being over in - I think it's five or seven rounds, perhaps.  At any rate, though theoretically Monte Carlo simulations could run without end, in practice one side or the other scores a random hit, ending the simulation.  A particular simulation may run long, but each simulation is done quickly.

Markov chains, however, cannot be ended by random numbers coming up.  The probability that all attackers and all defenders miss can approach zero over many rounds, but to avoid repeated rounds of calculation it's more practical to take the probability p no hits are scored and remove it from the list of possible outcomes, then multiply remaining results by 1/(1-p).  (Note:  Look up name for this process.)

However, using that process for Markov chains means reported results will be inaccurate.  Therefore, the program does not use the process for the first three rounds.

Typically, battle outcomes are well decided by the end of the third round when using certain rules frameworks.  Using the process outside that window cuts calculation time, yet still gives the user an accurate picture of the end results over time.

The user may specify added rounds for 'true' calculation, even running through to the end if desired.  Should the user elect to do so, they are notified of the reasons for truncation, and informed deciding to use true calculation can mean more complicated yet essentially not more informative data visualizations.

## Storage and Lookup




1.  Inputs 

Calculator returns probability distributions by rounds 1, 2, 3, finish.

User can 'dig in' to probability distribution, and define paramaters for payouts.  (For now, simply allow specification of IPC value per unit.  Later, add conditions like +4 utility of 2 bombers survive, etc)

e.g. R1 9 vs Ukr

Binomial probability formula

https://byjus.com/binomial-distribution-formula/

Where n = number of events, r = total number of successful events, p = probability of success single trial, 1-p = probability failure,

Where n choose r (nCr), the binomial coefficient, is n! / (k! * (n-k)!) or (n k) (though n is above k when written)

(n! / r! (n-r)!) * (p ^ r) * ((1-p) ^ (n-r))


## Structuring Inputs, How Data is Requested, Sent, and Received

1.  Input number of events and probability of success of each event.  Where 

(n! / r! (n-r)!) * (p ^ r) * ((1-p) ^ (n-r))

