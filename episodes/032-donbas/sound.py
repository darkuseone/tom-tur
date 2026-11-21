"""Звук выпуска 032 — Донбасс: SFX и атмосферы от событий картинки (ev.json). Подпись выпуска — звон латунных жетонов (первый звук
глобуса, доска хозяев, «ПОДПИШИСЬ»), отмотка — клеть, падающая в ствол шахты; музыка — music_donbas (бандура-остинато, виолончель, бубен).
Тяжёлые эпохи (оккупация, 2014, 2022) — музыка приглушена, без «весёлых» звуков, без выстрелов и взрывов. Одна концовка: после «отмотаем!» тишина."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: жетоны, глобус — наезд, комментарий, приземление, часы, доска хозяев
        ('token_clink', 0.0, 4), ('time_zoom', e('hk_zoom'), -6), ('whip_whoosh', e('hk_zoom', 0.5), -8), ('nav_ding', 0.2, -10), ('wind_gust', e('hk_land', -0.1), -8),
        ('watch_click', e('hk_watch', 0.2), -6), ('clock_tick_heavy', e('hk_300'), -10), ('token_clink', e('hk_owners'), 6), ('tiny_tuk', e('hk_owners', 0.3), -8), ('rewind', e('hk_go', 0.2), -8),
        # отмотка: клеть в ствол шахты
        ('spin_whoosh', S0['tunnel'] + 0.05, -3), ('cage_drop', S0['tunnel'] + 0.15, -2), ('whip_whoosh', S1['tunnel'] - 0.2, -4),
        # карбон: угольная пыль, глава, стрекоза, вайя, инфографика, плашка
        ('dust_whoosh', S0['fern'] - 0.05, -6), ('stamp_thud', S0['fern'] + 0.3, -8), ('dragonfly_buzz', S0['fern'] + 0.6, -8), ('token_clink', e('fr_own'), 0), ('silk_swish', e('fr_fern'), -6),
        ('dragonfly_buzz', e('fr_fern', 0.4), -12), ('collapse_rumble', e('fr_coal'), -10), ('weight_slam', e('fr_coal', 0.5), -10), ('tiny_tuk', e('fr_name'), -4),
        # XVIII в.: ковыль, табун, «ничьей», карта переселений, кайло — уголь
        ('wind_gust', S0['steppe'] - 0.1, -6), ('horses_gallop', e('st_wild'), -10), ('horse_neigh', e('st_wild', 0.6), -14), ('tiny_tuk', e('st_none'), -6), ('stamp_thud', e('st_none', 0.2), -8),
        ('paper_whoosh', e('st_emp', -0.1), -6), ('pencil_scribble', e('st_emp', 0.2), -8), ('shovel_dig', e('st_coal', -0.2), -4), ('rock_knock', e('st_coal'), -4), ('shimmer', e('st_coal', 0.2), -10),
        # 1869: пар, глава, паровоз, Хьюз, вывеска, табличка переименований
        ('steam_whistle', S0['yuzovka'] - 0.05, -8), ('stamp_thud', S0['yuzovka'] + 0.3, -8), ('train_steam_depart', e('yz_coal'), -12), ('gate_creak', e('yz_hughes', -0.3), -8), ('horse_neigh', e('yz_hughes'), -12),
        ('teleport_pop', e('yz_yuz'), -6), ('chain_clank', e('yz_yuz', 0.1), -10), ('tiny_tuk', e('yz_now'), -6), ('tiny_tuk', e('yz_now', 0.22), -6), ('tiny_tuk', e('yz_now', 0.44), -4),
        # 1924: красная линия, кабинет, машинка, карта, Шахты → РСФСР
        ('paper_whoosh', S0['border'] - 0.1, -6), ('pencil_scribble', S0['border'] + 0.4, -6), ('typewriter', S0['border'] + 0.8, -12), ('stamp_thud', e('bd_moscow'), -4),
        ('scroll_unroll', e('bd_ua', -0.1), -6), ('pencil_scribble', e('bd_ru'), -4), ('stamp_thud', e('bd_ru', 0.4), -6),
        # 1935/1941: вагонетка, отбойный молоток, вспышка, счётчик, бригада, свет гаснет
        ('boxcar_door_slide', S0['mine'] - 0.1, -8), ('jackhammer', e('mn_stak', -0.2), -8), ('camera_shutter', e('mn_102'), -6), ('metronome_tick', e('mn_102', 0.2), -10),
        ('tiny_tuk', e('mn_team'), -6), ('wood_bonk', e('mn_team', 0.3), -8), ('switch_clunk', e('mn_occ'), -2), ('collapse_rumble', e('mn_occ', 0.2), -10),
        # 1991: бюллетень, глава, урна, табло
        ('paper_whoosh', S0['vote'] - 0.1, -6), ('stamp_thud', S0['vote'] + 0.3, -8), ('paper_whoosh', e('vt_vote', -0.3), -8), ('wood_bonk', e('vt_vote'), -4), ('metronome_tick', e('vt_84'), -8), ('nav_ding', e('vt_84', 0.8), -8),
        # 2014: свет гаснет, глава, карта, счётчик (тихо, без выстрелов)
        ('neon_off', S0['war14'] - 0.05, -6), ('stamp_thud', S0['war14'] + 0.3, -8), ('paper_whoosh', e('w14_rus', -0.1), -8), ('gavel_bang', e('w14_rus', 0.3), -8), ('collapse_rumble', e('w14_war'), -14), ('clock_tick_heavy', e('w14_14k'), -8),
        # 2022: пыль, плашки, карта «аннексии», печать
        ('dust_whoosh', S0['war22'] - 0.05, -6), ('tiny_tuk', e('w22_inv'), -6), ('stamp_thud', e('w22_inv', 0.6), -10), ('paper_whoosh', e('w22_ann', -0.1), -8), ('stamp_thud', e('w22_ann', 0.2), -2),
        # ООН: табло, ответ, точки голосования, «против пяти»
        ('reception_bell', S0['today'] - 0.05, -10), ('gavel_bang', e('answer'), -4), ('medal_fanfare', e('answer', 0.1), -12), ('lottery_balls', e('td_143'), -10), ('tiny_tuk', e('td_5'), -4),
        # кнопка: телефон, «ПОДПИШИСЬ» на «Пиши» (жетоны); после голоса — тишина
        ('whip_whoosh', S0['button'] - 0.2, -12), ('teleport_pop', e('bt_send'), -8), ('nav_ding', e('bt_send', 0.3), -8), ('teleport_pop', e('endcard'), -4), ('token_clink', e('endcard', 0.05), 2),
    ]
    beds = [('steppe_wind_loop', 0, S0['tunnel']), ('city_loop', E['hk_land'], S0['tunnel']), ('jungle_loop', S0['fern'], S1['fern']), ('cave_drip_loop', S0['fern'], S1['fern']),
            ('steppe_wind_loop', S0['steppe'], S1['steppe']), ('forge_loop', S0['yuzovka'], S1['yuzovka']), ('palace_court_loop', S0['border'], S1['border']),
            ('bunker_hum_loop', S0['mine'], S1['mine']), ('cave_drip_loop', S0['mine'], S1['mine']), ('old_square_loop', S0['vote'], S1['vote']),
            ('occupation_night_loop', S0['war14'], S1['war14']), ('steppe_wind_loop', S0['war22'], S1['war22']), ('museum_day_loop', S0['today'], S1['today']), ('steppe_wind_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_donbas', music_duck=[(E['mn_occ'], S1['mine'], -6), (S0['war14'] - 0.1, S1['war22'], -7)])
