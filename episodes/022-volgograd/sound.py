"""Звук выпуска 022 — Волгоград: SFX и атмосферы от событий картинки (ev.json) и реплик. Семейство переходов — река, земля, металл."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: удар с 0,0 с, Статуя Свободы выезжает из земли, рулетка, «?», часы
        ('stamp_thud', 0.0, -3), ('wind_gust', 0.02, -8), ('tectonic_split', e('hk_lib'), -6), ('boulder_roll', e('hk_lib', 0.1), -10), ('weight_slam', e('hk_lib', 0.4), -6), ('pencil_scribble', e('hk_sh'), -8), ('tiny_tuk', e('hk_sh', 0.25), -6), ('teleport_pop', e('hk_q'), -6),
        ('watch_click', e('hk_wind'), 0), ('rewind', e('hk_wind', 0.15), -4), ('heavy_water_loop', S0['tunnel'] - 0.3, -8), ('dive_splash', S0['tunnel'] - 0.15, -4), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # XIV век: вал земли, бирка «Мамаев», рог Орды, табун, «тук» по кургану, штамп
        ('collapse_rumble', S0['horde'] - 0.2, -6), ('dust_whoosh', S0['horde'] + 0.1, -6), ('tiny_tuk', e('hd_mam'), -6), ('horse_neigh', e('hd_mam', 0.2), -10), ('war_horn', e('hd_orda'), -8), ('drum_march', e('hd_orda', 0.1), -14), ('rock_knock', e('hd_no'), -4), ('stamp_thud', e('hd_no', 0.05), -4), ('dog_bark', e('hd_orda', 0.4), -16),
        # 1589: поток реки, топоры, доска «Царицын», речка, призрак и красный крест
        ('dive_splash', S0['fort'] - 0.2, -4), ('heavy_water_loop', S0['fort'] - 0.1, -12), ('axe_chop', S0['fort'] + 0.3, -10), ('hammer_stakes', e('ft_name'), -6), ('shimmer', e('ft_river'), -8), ('dive_splash', e('ft_river', 0.1), -16), ('shimmer', e('ft_ghost', -0.05), -12), ('pencil_scribble', e('ft_ghost', 0.1), -6),
        # 1670: сабельный блеск, счётчик, пушки, ворота, стрельцы, перечёркивание
        ('sword_clash', S0['razin'] - 0.15, -4), ('whip_whoosh', S0['razin'] - 0.05, -8), ('tiny_tuk', e('rz_seven'), -6), ('typewriter', e('rz_seven', 0.1), -14), ('cannon_boom', e('rz_take', 0.05), -6), ('gate_creak', e('rz_take', 0.2), -10), ('drum_march', e('rz_str'), -10), ('musket_volley', e('rz_beat', -0.1), -14), ('pencil_scribble', e('rz_beat'), -6),
        # 1810: плуг, мельница, банка горчицы, «жгучую», штамп «русская»
        ('stone_saw', S0['sarepta'] - 0.2, -10), ('dust_whoosh', S0['sarepta'], -10), ('crowd_cheer', e('sr_ger'), -16), ('rope_creak', e('sr_ger', 0.1), -12), ('teleport_pop', e('sr_must'), -6), ('radiator_hiss', e('sr_must', 0.2), -14), ('fire_flare', e('sr_hot'), -6), ('cat_meow', e('sr_hot', 0.2), -8), ('stamp_thud', e('sr_rus'), -3),
        # 1930: стальные створки, буквы ворот, открытка USA, разлёт деталей, трактор
        ('rivets_steel', S0['tractor'] - 0.25, -6), ('weight_slam', S0['tractor'] - 0.05, -6), ('switch_clunk', e('tr_city'), -6), ('steam_whistle', e('tr_city', 0.2), -14), ('paper_whoosh', e('tr_usa'), -6), ('ship_bell', e('tr_usa', 0.15), -14), ('table_crash', e('tr_apart'), -10), ('weight_slam', e('tr_here'), -4), ('tractor_engine', e('tr_here', 0.1), -6),
        # 1942: взрыв, календарь, счётчик, стрелка на холм — сдержанно, музыка приглушена
        ('cannon_boom', S0['battle'] - 0.15, -4), ('collapse_rumble', S0['battle'], -8), ('metronome_tick', e('bt_200'), -8), ('paper_whoosh', e('bt_200', 0.05), -12), ('tiny_tuk', e('bt_mil'), -8), ('clock_tick_heavy', e('bt_mil', 0.2), -10), ('cannon_boom', e('bt_hill', -0.3), -14), ('whip_whoosh', e('bt_hill'), -10), ('stamp_thud', e('bt_135'), -8),
        # 1943: дождь осколков, холм темнеет, осколки сыплются в рамку, росток
        ('rivets_steel', S0['black'] - 0.2, -8), ('ice_shatter', S0['black'], -12), ('glacier_groan', e('bk_black'), -14), ('rock_knock', e('bk_shard'), -10), ('coins_pouch', e('bk_shard', 0.15), -12), ('tiny_tuk', e('bk_shard', 0.3), -8), ('shimmer', e('bk_grass'), -14), ('freeze_crackle', e('bk_no'), -12),
        # 1967: рябь реки, падают доски, огоньки памяти, счётчик, меч вспыхивает
        ('heavy_water_loop', S0['answer'] - 0.2, -10), ('dive_splash', S0['answer'] - 0.1, -10), ('wood_bonk', S0['answer'] + 0.4, -10), ('wood_bonk', S0['answer'] + 0.8, -12), ('shimmer', e('an_under'), -8), ('typewriter', e('answer'), -14), ('medal_fanfare', e('answer', 0.2), -10), ('clock_tick_heavy', e('an_def'), -10), ('crowd_cheer', e('an_so', 0.1), -14), ('shimmer', e('an_so'), -6),
        # сегодня: трещины, плашка «только война?», холодильник, значки эпох
        ('tectonic_split', S0['today'] - 0.2, -6), ('boulder_drop', S0['today'] + 0.1, -10), ('weight_slam', e('td_war'), -8), ('teleport_pop', e('td_must'), -6), ('gate_creak', e('td_fridge'), -10), ('nav_ding', e('td_fridge', 0.2), -10), ('ice_shatter', e('td_where'), -8), ('paper_whoosh', e('td_where', 0.1), -8), ('cat_meow', e('td_where', 0.4), -14),
        # кнопка: кольцо из часов, портал, возврат к ракурсу хука (петля: тот же удар)
        ('portal_open', S0['button'] - 0.2, -6), ('portal_open', E['portal'], -8), ('whip_whoosh', e('bt_point'), -10), ('clock_tick_heavy', e('bt_wink'), -4), ('wind_gust', DUR - 0.6, -8), ('stamp_thud', DUR - 0.25, -6),
    ]
    beds = [('gulls_river_loop', 0, S0['tunnel']), ('steppe_wind_loop', S0['horde'], S1['horde']), ('gulls_river_loop', S0['fort'], S1['fort']), ('storm_rain_loop', S0['razin'], S1['razin']),
            ('feast_loop', S0['sarepta'], S1['sarepta']), ('forge_loop', S0['tractor'], S1['tractor']), ('city_fire_loop', S0['battle'], S1['battle']), ('steppe_wind_loop', S0['black'], S1['black']),
            ('gulls_river_loop', S0['answer'], S1['answer']), ('night_city_loop', S0['today'], S1['today']), ('gulls_river_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_volgograd', music_duck=[(S0['battle'] - 0.1, S1['black'], -8)])
