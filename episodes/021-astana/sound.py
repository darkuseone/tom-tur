"""Звук выпуска 021 — Астана: SFX и атмосферы от событий картинки (ev.json) и реплик. Семейство переходов — ветер степи и таблички с именем."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: удар с 0,0 с, ветер, таблички-имена вылетают, вопрос, часы
        ('stamp_thud', 0.0, -3), ('wind_gust', 0.02, -6), ('paper_whoosh', e('hk_five'), -6), ('tiny_tuk', e('hk_five', 0.12), -8), ('tiny_tuk', e('hk_five', 0.36), -9), ('wood_bonk', e('hk_cap'), -8), ('shimmer', e('hk_what'), -12), ('teleport_pop', e('hk_q'), -6),
        ('watch_click', e('hk_wind'), 0), ('rewind', e('hk_wind', 0.15), -4), ('wind_gust', S0['tunnel'] - 0.2, -4), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # 2019–2022: табличка из часов, календарь, смена таблички на стеле, стопка
        ('whip_whoosh', S0['rename'] - 0.15, -4), ('wood_bonk', S0['rename'] + 0.25, -6), ('tiny_tuk', e('rn_nur'), -6), ('metronome_tick', e('rn_22'), -8), ('rope_creak', e('rn_22', 0.1), -8), ('stamp_thud', e('rn_ast'), -4), ('dog_bark', e('rn_ast', 0.3), -14), ('wood_bonk', e('rn_pile'), -6), ('wood_bonk', e('rn_pile', 0.25), -8),
        # 2010: буран → тепло, термометр, «пуф», мяч, мешок песка
        ('wind_gust', S0['shatyr'] - 0.25, -2), ('shiver_brr', e('sh_m40'), -6), ('freeze_crackle', e('sh_m40', 0.05), -10), ('poof_cloth', e('sh_in'), -4), ('dive_splash', e('sh_beach'), -8), ('dust_whoosh', e('sh_sand'), -6), ('crowd_cheer', e('sh_sand', 0.3), -16),
        # 1997: табличка сдувается, буквы на крыше, автобус, карточка, календарь, штамп
        ('wind_gust', S0['akmola'] - 0.2, -4), ('paper_whoosh', S0['akmola'] + 0.1, -6), ('switch_clunk', e('ak_cap'), -6), ('arc_buzz', e('ak_cap', 0.1), -14), ('steam_whistle', e('ak_in'), -18), ('paper_whoosh', e('ak_grave', -0.05), -8), ('tiny_tuk', e('ak_grave'), -6), ('typewriter', e('ak_half'), -10), ('stamp_thud', e('ak_stamp'), -2),
        # 1961: волна ковыля, транспарант, счётчик гектаров, трактор, вывеска
        ('dust_whoosh', S0['tselina'] - 0.2, -6), ('cloth_rip', e('ts_go'), -10), ('crowd_cheer', e('ts_go', 0.1), -12), ('tractor_engine', e('ts_mil', -0.2), -6), ('typewriter', e('ts_mil'), -12), ('tiny_tuk', e('ts_ha'), -6), ('wood_bonk', e('ts_city'), -4), ('stamp_thud', e('ts_city', 0.1), -6),
        # 1938: тёмная позёмка, доска, карточка, счётчик — сдержанно
        ('wind_gust', S0['alzhir'] - 0.2, -6), ('gate_creak', e('al_name', -0.1), -8), ('paper_whoosh', e('al_name', 0.05), -12), ('rope_creak', e('al_wives'), -14), ('stamp_thud', e('al_enemy'), -12), ('tiny_tuk', e('al_num'), -10), ('metronome_tick', e('al_num', 0.2), -12), ('clock_tick_heavy', e('al_women'), -10),
        # 1830: пыльный вихрь, топоры, караван в броде, башня, доска, «имя №1»
        ('dust_whoosh', S0['fort'] - 0.25, -3), ('axe_chop', e('ft_kaz'), -4), ('hammer_stakes', e('ft_kaz', 0.4), -12), ('dive_splash', e('ft_ish'), -12), ('camel_grunt', e('ft_ish', 0.2), -8), ('rope_creak', e('ft_fort'), -8), ('tiny_tuk', e('ft_one'), -6), ('hammer_stakes', e('ft_name'), -6), ('horse_neigh', e('ft_name', 0.5), -14),
        # X век: ковыль-вспышка, «пустое место», 1997?, город из-под земли, бирка
        ('shimmer', S0['bozok'] - 0.2, -6), ('wind_gust', S0['bozok'], -10), ('pencil_scribble', e('bz_empty'), -10), ('tiny_tuk', e('bz_97'), -6), ('tectonic_split', e('bz_rise'), -4), ('collapse_rumble', e('bz_rise', 0.3), -12), ('camel_grunt', e('bz_city'), -10), ('medal_fanfare', e('bz_name'), -10),
        # ответ: табличка разворачивается, словарь, «СТОЛИЦА», смех, таблички улетают
        ('whip_whoosh', S0['answer'] - 0.2, -6), ('wood_bonk', S0['answer'] + 0.05, -8), ('paper_whoosh', e('an_kaz'), -8), ('pencil_scribble', e('answer'), -6), ('medal_fanfare', e('answer', 0.2), -10), ('wind_gust', e('an_city'), -8), ('stamp_thud', e('an_cap'), -4), ('cat_meow', e('an_cap', 0.4), -14),
        # кнопка: кольцо из часов, портал, возврат к ракурсу хука (петля: ветер + удар как в 0,0 с)
        ('portal_open', S0['button'] - 0.2, -6), ('portal_open', E['portal'], -8), ('whip_whoosh', e('bt_point'), -10), ('clock_tick_heavy', e('bt_wink'), -4), ('wind_gust', DUR - 0.6, -8), ('stamp_thud', DUR - 0.25, -6),
    ]
    beds = [('steppe_wind_loop', 0, S0['tunnel']), ('blizzard_loop', S0['rename'], S1['rename']), ('beach_pool_loop', S0['shatyr'], S1['shatyr']), ('blizzard_loop', S0['akmola'], S1['akmola']),
            ('steppe_wind_loop', S0['tselina'], S1['tselina']), ('blizzard_loop', S0['alzhir'], S1['alzhir']), ('campfire_loop', S0['fort'], S1['fort']), ('steppe_wind_loop', S0['bozok'], S1['bozok']),
            ('city_loop', S0['answer'], S1['answer']), ('steppe_wind_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_astana', music_duck=[(S0['alzhir'] - 0.1, S1['alzhir'], -8)])
