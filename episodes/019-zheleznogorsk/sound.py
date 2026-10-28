"""Звук выпуска 019 — Железногорск: SFX и атмосферы от событий картинки (ev.json) и реплик."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: удар + прожектор с 0,0 с, лай, тени уходят в гору, вопрос
        ('switch_clunk', 0.0, -2), ('stamp_thud', 0.02, -4), ('dog_bark', 0.6, -12), ('dust_whoosh', e('hk_80'), -10), ('shimmer', e('hk_why'), -6), ('whip_whoosh', e('hk_why', -0.05), -8),
        ('watch_click', e('hk_wind'), 0), ('rewind', e('hk_wind', 0.15), -4), ('switch_clunk', S0['tunnel'] - 0.3, -8), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # 1950 Кремль: штамп, куранты, карандаш, гул самолётов
        ('stamp_thud', S0['kremlin'] - 0.05, 0), ('kremlin_chimes', S0['kremlin'] + 0.2, -16), ('pencil_scribble', e('kr_gora'), -6), ('shimmer', e('kr_reka'), -10), ('heli_sputter', e('kr_bomb'), -14), ('siren_curfew', e('kr_bomb', 0.2), -18),
        # 1950 лагерь: росчерк, гудок, лай, календарь, рельс
        ('pencil_scribble', S0['rails'] - 0.35, -6), ('steam_whistle', S0['rails'] + 0.1, -10), ('dog_bark', e('rl_lager', 0.1), -8), ('paper_whoosh', e('rl_5'), -6), ('tiny_tuk', e('rl_51'), -6), ('hammer_stakes', e('rl_51', 0.4), -10), ('weight_slam', e('rl_drop', 0.15), -4),
        # забой: перфораторы, вагонетки, разрез горы
        ('jackhammer', S0['drill'] + 0.1, -12), ('drum_march', e('dr_stroy'), -16), ('jackhammer', e('dr_gryz'), -6), ('rock_knock', e('dr_gryz', 0.4), -8), ('boulder_roll', e('dr_gryz', 0.6), -14), ('stamp_thud', e('dr_200'), -8),
        # 1953: пыль, тишина, ворота, толпа, стройка идёт
        ('dust_whoosh', S0['amnesty'] - 0.3, -6), ('radio_tune', e('am_died', -0.1), -14), ('gate_creak', e('am_amn'), -2), ('tiny_tuk', e('am_17'), -6), ('jackhammer', e('am_go'), -16),
        # город-тайна: газета-конверт, карта, штамп
        ('paper_whoosh', S0['secret'] - 0.3, -4), ('scroll_unroll', e('sc_map'), -8), ('paper_whoosh', e('sc_mail'), -6), ('stamp_thud', e('sc_iron'), -4), ('wood_bonk', e('sc_aga'), -8),
        # 1958 ответ: маркер, рубильник, гул, «Pu», бомба
        ('pencil_scribble', S0['reactor'] - 0.3, -4), ('cloth_rip', e('re_on', -0.05), -6), ('switch_clunk', e('re_on'), 0), ('medal_fanfare', e('answer'), -12), ('stamp_thud', e('answer'), -4), ('weight_slam', e('re_bomb'), -8),
        # 1964: вспышка, труба, батарея, медаль
        ('shimmer', S0['heat'] - 0.3, -6), ('vortex_suck', S0['heat'] - 0.15, -8), ('radiator_hiss', e('ht_bat'), -10), ('teleport_pop', e('ht_city'), -10), ('medal_fanfare', e('ht_first'), -8),
        # 2010: метель-зум, АЗ, лампы гаснут
        ('wind_gust', S0['last'] - 0.3, -6), ('alarm_buzz', e('ls_off'), -4), ('neon_off', e('ls_off', 0.3), -8), ('stamp_thud', e('ls_ru', 0.2), -6),
        # сегодня: экран гаснет, спутник, навигатор
        ('neon_off', S0['today'] - 0.3, -8), ('shimmer', S0['today'] + 0.05, -6), ('shimmer', e('td_glo'), -4), ('nav_ding', e('td_nav'), -2),
        # кнопка: метка падает, портал, возврат к горе (петля)
        ('whip_whoosh', S0['button'] - 0.3, -6), ('nav_ding', S0['button'] - 0.05, -6), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('switch_clunk', DUR - 0.9, -10),
    ]
    beds = [('blizzard_loop', 0, S0['tunnel']), ('city_loop', S0['kremlin'], S1['kremlin']), ('forest_loop', S0['rails'], S1['rails']), ('cave_drip_loop', S0['drill'], S1['drill']),
            ('blizzard_loop', S0['amnesty'], S1['amnesty']), ('city_loop', S0['secret'], S1['secret']), ('reactor_hum_loop', S0['reactor'], S1['reactor']),
            ('blizzard_loop', S0['heat'], S1['heat']), ('reactor_hum_loop', S0['last'], S1['last']), ('metro_loop', S0['today'], S1['today']), ('blizzard_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_zhel', music_duck=[(S0['rails'] - 0.1, S1['amnesty'], -6)])
