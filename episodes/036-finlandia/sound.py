"""Звук выпуска 036 — Финляндия: подпись — кантеле (первый звук глобуса, главы, «ПОДПИШИСЬ»), бубенцы саней; музыка — music_finland.
Зимняя война — музыка приглушена, без выстрелов и взрывов. Одна концовка: после «отмотаем!» тишина."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: кантеле, глобус, вопрос туристки, «Именно!», плашка 132 года
        ('kantele_sting', 0.0, -4), ('time_zoom', e('hk_zoom'), -6), ('whip_whoosh', e('hk_zoom', 0.5), -8), ('wind_gust', e('hk_land', -0.1), -8), ('nav_ding', e('hk_ask', 0.3), -10),
        ('sleigh_bells', e('hk_land', 0.4), -12), ('stamp_thud', e('hk_yes'), -4), ('metronome_tick', e('hk_130'), -8), ('rewind', e('hk_go', 0.3), -10),
        # отмотка: северное сияние
        ('spin_whoosh', S0['tunnel'] + 0.05, -3), ('shimmer', S0['tunnel'] + 0.3, -4), ('vortex_suck', S0['tunnel'] + 0.5, -10), ('glass_tap_ring', S1['tunnel'] - 0.2, -6),
        # 1550: глава, чайки, грамота короля, плашка
        ('stamp_thud', S0['sweden'] + 0.3, -8), ('rope_creak', S0['sweden'] + 0.5, -12), ('tiny_tuk', e('sw_600'), -6), ('scroll_unroll', e('sw_se'), -6),
        # 1809: глава, карта, перо, печать на законах
        ('paper_whoosh', S0['porvoo'] - 0.1, -6), ('stamp_thud', S0['porvoo'] + 0.3, -8), ('paper_whoosh', e('pv_map'), -8), ('pencil_scribble', e('pv_ru'), -6), ('church_bell_toll', e('pv_law'), -14), ('stamp_thud', e('pv_end'), -4),
        # 1812: указ, стройка, крошечный город на ладони
        ('dust_whoosh', S0['capital'] - 0.1, -8), ('scroll_unroll', e('cp_a1'), -6), ('stamp_thud', e('cp_a1', 0.4), -8), ('teleport_pop', e('cp_tiny'), -6), ('tiny_tuk', e('cp_hel'), -6),
        # 1863: монеты, двери, мел по доске
        ('coins_pouch', S0['reforms'] - 0.1, -8), ('gate_creak', e('rf_sejm'), -8), ('crowd_cheer', e('rf_sejm', 0.2), -16), ('coins_pouch', e('rf_mark'), -4), ('pencil_scribble', e('rf_lang'), -4),
        # 1894: покрывало, оркестр, фанфара
        ('cloth_rip', S0['statue'] - 0.05, -12), ('drum_march', e('st_put'), -12), ('silk_swish', e('st_mon'), -4), ('medal_fanfare', e('st_mon', 0.2), -10), ('crowd_cheer', e('st_mon', 0.3), -12), ('camera_shutter', e('st_sq'), -8),
        # 1899: лепестки, манифест падает, цветы
        ('silk_swish', S0['flowers'] - 0.1, -8), ('paper_whoosh', e('fl_nik'), -6), ('stamp_thud', e('fl_rus'), -8), ('shimmer', e('fl_put'), -8), ('kantele_sting', e('fl_fl'), -10),
        # 1917: глава, флаг, факелы, стук по постаменту
        ('whip_whoosh', S0['indep'] - 0.1, -8), ('stamp_thud', S0['indep'] + 0.3, -8), ('sail_flap', e('in_go'), -6), ('crowd_cheer', e('in_go', 0.2), -12), ('tiny_tuk', e('in_tsar'), -8), ('rock_knock', e('in_left'), -2), ('rock_knock', e('in_left', 0.2), -4),
        # 1939: метель, счётчик, карта, «отстояли»
        ('wind_gust', S0['winter'] - 0.1, -6), ('clock_tick_heavy', e('wn_war'), -8), ('metronome_tick', e('wn_105'), -8), ('paper_whoosh', e('wn_map'), -8), ('cloth_rip', e('wn_kar'), -6), ('stamp_thud', e('wn_keep'), -4),
        # сегодня: ответ, теги, штамп 1917
        ('shimmer', S0['today'] - 0.1, -8), ('gavel_bang', e('answer'), -4), ('tiny_tuk', e('td_good'), -4), ('tiny_tuk', e('td_good', 0.12), -6), ('tiny_tuk', e('td_good', 0.24), -6), ('tiny_tuk', e('td_good', 0.36), -6), ('stamp_thud', e('td_state'), -2),
        # кнопка: «ПОДПИШИСЬ» на «Пиши» (кантеле); после голоса — тишина
        ('whip_whoosh', S0['button'] - 0.2, -12), ('teleport_pop', e('bt_send'), -8), ('nav_ding', e('bt_send', 0.3), -8), ('teleport_pop', e('endcard'), -4), ('kantele_sting', e('endcard', 0.05), -8),
    ]
    beds = [('old_square_loop', 0, S0['tunnel']), ('blizzard_loop', E['hk_land'], S0['tunnel']), ('gulls_river_loop', S0['sweden'], S1['sweden']), ('blizzard_loop', S0['sweden'], S1['sweden']),
            ('palace_court_loop', S0['porvoo'], S1['porvoo']), ('construction_loop', S0['capital'], S1['capital']), ('palace_court_loop', S0['reforms'], S1['reforms']), ('old_square_loop', S0['statue'], S1['statue']),
            ('blizzard_loop', S0['flowers'], S1['flowers']), ('campfire_loop', S0['indep'], S1['indep']), ('blizzard_loop', S0['winter'], S1['winter']), ('campfire_loop', S0['winter'], S1['winter']),
            ('old_square_loop', S0['today'], S1['today']), ('old_square_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_finland', music_duck=[(S0['winter'], S1['winter'], -6)])
