/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TREASURE_QUESTS } from '../data/castlesData';
import { TreasureQuest, Riddle } from '../types';
import { Coins, Sparkles, Trophy, CheckCircle, HelpCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function TreasureQuestView() {
  // Global score trackers
  const [goldCoins, setGoldCoins] = useState<number>(0);
  const [unlockedRelics, setUnlockedRelics] = useState<string[]>([]);
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([]);

  // Active quest state
  const [activeQuestId, setActiveQuestId] = useState<string | null>(null);
  const [currentRiddleIdx, setCurrentRiddleIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showRiddleResult, setShowRiddleResult] = useState<boolean>(false);
  const [isOptionCorrect, setIsOptionCorrect] = useState<boolean>(false);
  const [errorsInQuest, setErrorsInQuest] = useState<boolean>(false);

  // Load profile from localStorage
  useEffect(() => {
    try {
      const savedGold = localStorage.getItem('castleverse_gold');
      const savedRelics = localStorage.getItem('castleverse_relics');
      const savedQuests = localStorage.getItem('castleverse_completed_quests');

      if (savedGold) setGoldCoins(parseInt(savedGold) || 0);
      if (savedRelics) setUnlockedRelics(JSON.parse(savedRelics));
      if (savedQuests) setCompletedQuestIds(JSON.parse(savedQuests));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const activeQuest = TREASURE_QUESTS.find(q => q.id === activeQuestId);
  const currentRiddle = activeQuest?.riddles[currentRiddleIdx];

  const handleStartQuest = (questId: string) => {
    setActiveQuestId(questId);
    setCurrentRiddleIdx(0);
    setSelectedOption(null);
    setShowRiddleResult(false);
    setErrorsInQuest(false);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || !currentRiddle) return;

    const correct = selectedOption === currentRiddle.answerIndex;
    setIsOptionCorrect(correct);
    setShowRiddleResult(true);

    if (!correct) {
      setErrorsInQuest(true);
    }
  };

  const handleNextRiddle = () => {
    if (!activeQuest) return;

    setSelectedOption(null);
    setShowRiddleResult(false);

    if (currentRiddleIdx < activeQuest.riddles.length - 1) {
      setCurrentRiddleIdx(prev => prev + 1);
    } else {
      // Completed last riddle of the Quest
      const alreadyDone = completedQuestIds.includes(activeQuest.id);
      
      if (!alreadyDone) {
        // Double reward for flawless run, standard reward if made mistake
        const finalReward = errorsInQuest ? activeQuest.goldReward : activeQuest.goldReward + 200;
        const newGold = goldCoins + finalReward;
        const newRelics = [...unlockedRelics, activeQuest.rewardTitle];
        const newQuests = [...completedQuestIds, activeQuest.id];

        // Save states
        setGoldCoins(newGold);
        setUnlockedRelics(newRelics);
        setCompletedQuestIds(newQuests);

        localStorage.setItem('castleverse_gold', newGold.toString());
        localStorage.setItem('castleverse_relics', JSON.stringify(newRelics));
        localStorage.setItem('castleverse_completed_quests', JSON.stringify(newQuests));
      }

      // Exit active state
      setShowRiddleResult(true); // Will render completion block
    }
  };

  const resetAllTreasury = () => {
    if (window.confirm('Verily, art thou prepared to purge thy earned castle vault of all gold and legendary relics?')) {
      setGoldCoins(0);
      setUnlockedRelics([]);
      setCompletedQuestIds([]);
      localStorage.setItem('castleverse_gold', '0');
      localStorage.setItem('castleverse_relics', '[]');
      localStorage.setItem('castleverse_completed_quests', '[]');
      setActiveQuestId(null);
    }
  };

  return (
    <div className="relative w-full rounded-2xl border border-amber-500/20 bg-zinc-950 p-6 shadow-2xl id_treasure_quest_block" id="treasure-quest-root">
      
      {/* HUD Bar mapping out real-time persistent statistics */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5 border-b border-zinc-900 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Coins className="w-4 h-4 text-amber-500 animate-bounce" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Imperial Vault Accounts</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-amber-100 tracking-wide">
            Hidden Treasure Quests
          </h2>
          <p className="text-xs text-zinc-400">
            Secure forgotten royal relics by answering riddle formulas designed by ancient castle guardians.
          </p>
        </div>

        {/* Treasury Chest HUD Panel */}
        <div className="flex items-center gap-4 p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
          <div className="space-y-0.5">
            <span className="text-[9px] font-mono text-zinc-500 uppercase block leading-none">Your Treasury Coins</span>
            <div className="flex items-center gap-1.5 font-mono text-amber-400 font-bold">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>{goldCoins} Gold</span>
            </div>
          </div>

          <div className="h-8 w-px bg-zinc-800"></div>

          <div className="space-y-0.5">
            <span className="text-[9px] font-mono text-zinc-500 uppercase block leading-none">Relics Salvaged</span>
            <span className="text-xs font-serif text-zinc-300 block font-bold">
              {unlockedRelics.length} Treasures
            </span>
          </div>

          {unlockedRelics.length > 0 && (
            <button
              onClick={resetAllTreasury}
              className="p-1.5 hover:bg-zinc-800/80 rounded text-zinc-600 hover:text-red-400 transition-colors"
              title="Purge Treasury Profiles"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {unlockedRelics.length > 0 && !activeQuestId && (
        <div className="p-4 bg-amber-950/10 border border-amber-500/15 rounded-xl mb-6">
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-2.5 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-500" /> Unlocked Relics Cabinet
          </span>

          <div className="flex flex-wrap gap-2 pr-1">
            {unlockedRelics.map((relic, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-zinc-900 border border-amber-500/20 text-amber-200 text-xs font-serif rounded-lg flex items-center gap-1.5"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                {relic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main interactive area */}
      {!activeQuestId ? (
        /* Quest grid catalogs catalog */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="quests-list-grid">
          {TREASURE_QUESTS.map((quest) => {
            const isCompleted = completedQuestIds.includes(quest.id);
            return (
              <div
                key={quest.id}
                className={`group relative p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[220px] ${
                  isCompleted
                    ? 'border-emerald-500/25 bg-emerald-950/5'
                    : 'border-zinc-800 bg-zinc-900/40 hover:border-amber-500/20 hover:bg-zinc-900/60'
                }`}
                id={`quest-card-${quest.id}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                      {quest.castleName}
                    </span>
                    {isCompleted ? (
                      <span className="px-1.5 py-0.5 bg-emerald-950 border border-emerald-500/20 rounded text-emerald-400 text-[9px] font-mono uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5" /> Resolved
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 bg-amber-950/50 border border-amber-500/20 rounded text-amber-400 text-[9px] font-mono uppercase tracking-wider">
                        Uncharted
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-base font-bold text-amber-100 tracking-wide mb-1 leading-snug">
                    {quest.title}
                  </h3>
                  <p className="text-[11px] text-zinc-400 leading-normal mb-4 font-sans line-clamp-3">
                    {quest.description}
                  </p>
                </div>

                <div className="border-t border-zinc-900 pt-3.5 mt-2 flex justify-between items-center bg-zinc-950/0">
                  <div className="text-[11px] font-mono">
                    <span className="text-zinc-500 block text-[9px] uppercase">Reward Value</span>
                    <span className="text-amber-400 font-bold">{quest.goldReward} Gold</span>
                  </div>

                  <button
                    onClick={() => handleStartQuest(quest.id)}
                    className={`px-4 py-2 font-serif text-[11px] rounded-lg tracking-wide uppercase transition-all ${
                      isCompleted
                        ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                        : 'bg-amber-500 hover:bg-amber-400 text-black font-semibold shadow-lg shadow-amber-500/10'
                    }`}
                    id={`btn-begin-quest-${quest.id}`}
                  >
                    {isCompleted ? 'Replay Quest' : 'Begin Quest'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ACTIVE QUEST RENDER PANEL */
        <div className="gold-border p-5 rounded-2xl relative" id="active-quest-compound">
          {/* Quest complete screen overlay */}
          {completedQuestIds.includes(activeQuestId) && showRiddleResult && currentRiddleIdx === activeQuest!.riddles.length - 1 && selectedOption === activeQuest!.riddles[currentRiddleIdx].answerIndex ? (
            
            <div className="text-center py-8 space-y-4" id="quest-success-screen">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <Trophy className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block mb-0.5">Quest Resolved Flawlessly</span>
                <h3 className="font-serif text-2xl font-bold text-amber-100 tracking-wide">
                  {activeQuest!.title} Secured!
                </h3>
              </div>

              <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed font-sans">
                By solving the ancient riddles of {activeQuest!.castleName}, thou hast uncovered the sacred relic:
                <span className="block mt-2 font-serif text-sm font-bold text-amber-300">{activeQuest!.rewardTitle}</span>
              </p>

              <div className="p-3 bg-zinc-900 border border-zinc-800 max-w-xs mx-auto rounded-xl">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block pl-0.5">Treasury deposit of</span>
                <span className="font-mono text-base text-amber-400 font-bold block">
                  +{errorsInQuest ? activeQuest!.goldReward : activeQuest!.goldReward + 200} Gold Coins
                </span>
                {!errorsInQuest && (
                  <span className="text-[9px] font-mono text-emerald-400 block mt-1">+200 Perfect Run Gold Crown Bonus</span>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveQuestId(null)}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-serif font-black text-xs uppercase tracking-widest rounded-lg transition-all"
                  id="btn_back_to_inventory"
                >
                  Return to Chronicles
                </button>
              </div>
            </div>

          ) : (
            
            /* RENDERING ACTIVE RIDDLE SCREEN */
            <div className="space-y-4">
              
              {/* Top tracker */}
              <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                <div>
                  <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest">
                    Active Quest: {activeQuest!.castleName}
                  </span>
                  <h4 className="font-serif text-[15px] font-black text-amber-100 uppercase tracking-wide leading-none mt-1">
                    {activeQuest!.title}
                  </h4>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block">Riddle Process</span>
                  <span className="text-sm font-mono text-amber-400 font-bold">
                    {currentRiddleIdx + 1} / {activeQuest!.riddles.length}
                  </span>
                </div>
              </div>

              {/* Present Riddle Challenge */}
              <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-900 space-y-1">
                <div className="flex gap-2 text-amber-500">
                  <HelpCircle className="w-4 h-4 mt-0.5" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Guards Challenge Formula</span>
                </div>
                <p className="text-xs sm:text-sm font-serif text-zinc-200 pl-6 leading-relaxed">
                  {currentRiddle!.question}
                </p>
              </div>

              {/* Riddle Answers Radio options */}
              <div className="space-y-2" id="answers-options-block">
                {currentRiddle!.options.map((optionText, idx) => {
                  const isChecked = selectedOption === idx;
                  let optionBorder = 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/30';
                  
                  if (isChecked) {
                    optionBorder = 'border-amber-500 bg-amber-950/20 text-amber-200';
                  }

                  if (showRiddleResult) {
                    if (idx === currentRiddle!.answerIndex) {
                      optionBorder = 'border-emerald-500 bg-emerald-950/35 text-emerald-400';
                    } else if (isChecked) {
                      optionBorder = 'border-red-500 bg-red-950/35 text-red-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={showRiddleResult}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-[13px] font-sans transition-all flex items-center justify-between ${optionBorder}`}
                      id={`option-btn-${idx}`}
                    >
                      <span className="pr-4">{optionText}</span>

                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isChecked ? 'border-amber-500 text-amber-500' : 'border-zinc-700'
                      }`}>
                        {isChecked && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and dynamic alchemical hints */}
              {showRiddleResult && (
                <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
                  isOptionCorrect 
                    ? 'bg-emerald-950/15 border-emerald-500/20 text-emerald-400' 
                    : 'bg-red-950/15 border-red-500/20 text-red-400'
                }`} id="riddle-feedback">
                  {isOptionCorrect ? (
                    <>
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-serif text-xs font-bold block">Correct formulation!</span>
                        <p className="text-[11px] text-zinc-300 leading-normal mt-0.5">The locking mechanism clicks with a heavy visual strike of medieval gears. Prepare for the next vault chambers.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-serif text-xs font-bold block">Formula failed.</span>
                        <p className="text-[11px] text-zinc-300 leading-normal mt-0.5">
                          <span className="font-mono text-red-400/90 font-semibold uppercase block text-[9px]">Garrison Scholar Alchemical Hint:</span>
                          &ldquo;{currentRiddle!.hint}&rdquo;
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Controllers row */}
              <div className="flex justify-between items-center pt-3 border-t border-zinc-900">
                <button
                  onClick={() => setActiveQuestId(null)}
                  className="text-xs text-zinc-500 hover:text-zinc-300 font-mono"
                  id="btn_forfeit_quest"
                >
                  Forfeit Chest Hunt
                </button>

                {!showRiddleResult ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleAnswerSubmit}
                    className={`px-6 py-2 rounded-lg font-serif text-[11px] font-bold uppercase tracking-wider transition-all ${
                      selectedOption !== null
                        ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-gold-500/10'
                        : 'bg-zinc-900 text-zinc-600'
                    }`}
                    id="btn_submit_answer"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextRiddle}
                    className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-black font-serif text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all"
                    id="btn_next_riddle"
                  >
                    {currentRiddleIdx < activeQuest!.riddles.length - 1 ? 'Next Riddle Chambers' : 'Examine Final Chambers'}
                  </button>
                )}
              </div>

            </div>
          )}
        </div>
      )}

    </div>
  );
}
