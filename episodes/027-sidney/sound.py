"""Звук выпуска 027 — Сидней: SFX и атмосферы от событий картинки (ev.json). Подпись выпуска — смех кукабарры (первый звук хука
и звук «ПОДПИШИСЬ»), гудок парома — на гавани; музыка — music_sydney (гитара, укулеле, свист). Одна концовка: после «отмотаем!» тишина."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: кукабарра, чайки, удар по ценнику, ценник крутится, «Кто заплатил?», бумеранг в лапе
        ('kookaburra_laugh', 0.0, -6), ('ferry_horn', 0.4, -14), ('wood_bonk', e('hk_tag'), -2), ('whip_whoosh', e('hk_14', -0.05), -8), ('coins_pouch', e('hk_14', 0.2), -6), ('stamp_thud', e('hk_14', 0.35), -8),
        ('shimmer', e('hk_opera'), -12), ('tiny_tuk', e('hk_q'), -6), ('teleport_pop', E['h2'], -6), ('watch_click', E['h2'] + 0.05, -6), ('rewind', E['h2'] + 0.15, -8),
        # отмотка-бумеранг: воронка, свист оборота, бумеранг кружит и влетает в камеру, вспышка
        ('vortex_suck', S0['tunnel'] - 0.15, -8), ('spin_whoosh', S0['tunnel'] + 0.05, -3), ('boomerang_whir', S0['tunnel'] + 0.2, -2), ('boomerang_whir', S0['tunnel'] + 0.9, 0), ('whip_whoosh', S0['tunnel'] + 1.25, -4),
        # 1788: парус, глава, вёсла, счётчик, билет, корешок рвётся
        ('sail_flap', S0['convicts'] - 0.05, -2), ('stamp_thud', S0['convicts'] + 0.3, -8), ('ship_bell', S0['convicts'] + 0.6, -12), ('rope_creak', e('cv_prison'), -10), ('drum_march', e('cv_prison', 0.1), -16),
        ('tiny_tuk', e('cv_800'), -4), ('metronome_tick', e('cv_800', 0.3), -10), ('paper_whoosh', e('cv_ticket', -0.1), -6), ('cloth_rip', e('cv_end', 0.05), -6), ('kookaburra_laugh', e('cv_end', 0.3), -14),
        # 1851: золотой песок, лоток с водой, самородок, город растёт, часы
        ('dust_whoosh', S0['gold'] - 0.15, -4), ('coins_pouch', S0['gold'] - 0.05, -10), ('dive_splash', e('gd_but'), -16), ('shimmer', e('gd_gold'), -2), ('goblet_clink', e('gd_gold', 0.05), -8),
        ('brick_trowel', e('gd_rich'), -8), ('chisel_strike', e('gd_rich', 0.3), -10), ('clock_tick_heavy', e('gd_city'), -8), ('horse_neigh', e('gd_city', 0.3), -16),
        # 1932: стальная балка, глава, клёпка, арка смыкается — удар и фанфары, монета в кассу, лента-квитанция, штамп «56 лет»
        ('rivets_steel', S0['bridge'] - 0.15, -4), ('stamp_thud', S0['bridge'] + 0.3, -8), ('rivets_steel', e('br_30'), -12), ('weight_slam', e('br_hang'), -2), ('medal_fanfare', e('br_hang', 0.1), -10), ('train_steam_depart', e('br_hang', 0.5), -16),
        ('coins_pouch', e('br_debt', -0.2), -4), ('switch_clunk', e('br_debt', -0.15), -8), ('typewriter', e('br_debt', 0.1), -10), ('stamp_thud', e('br_56'), 0),
        # 1957: калька, глава, колокольчик, «№ 218», нырок в корзину, эскиз вспыхивает
        ('paper_whoosh', S0['contest'] - 0.1, -4), ('stamp_thud', S0['contest'] + 0.3, -8), ('reception_bell', e('ct_comp'), -2), ('pencil_scribble', e('ct_win'), -6), ('tiny_tuk', e('ct_win', 0.1), -6),
        ('paper_whoosh', e('ct_leg'), -8), ('paper_whoosh', e('ct_leg', 0.4), -10), ('shimmer', e('ct_rej'), -2), ('piano_sting', e('ct_rej', 0.05), -12),
        # 1966: дождь, табло щёлкает, газеты, зонт опускается
        ('wind_gust', S0['quit'] - 0.1, -6), ('metronome_tick', e('qt_cost'), -6), ('metronome_tick', e('qt_cost', 0.6), -6), ('tiny_tuk', e('qt_66'), -10), ('tiny_tuk', e('qt_left'), -8), ('paper_whoosh', e('qt_left', 0.3), -8),
        ('paper_whoosh', e('qt_left', 0.7), -10), ('silk_swish', e('qt_never'), -8), ('erhu_sting', e('qt_never', 0.1), -14),
        # 1973: салют, толпа, вспышки, ценник, бокал
        ('fireworks', S0['open'] - 0.1, -6), ('crowd_cheer', S0['open'] + 0.2, -12), ('camera_shutter', e('op_open'), -8), ('tiny_tuk', e('op_10'), -6), ('stamp_thud', e('op_102'), -4), ('glass_tap_ring', e('op_7'), -4), ('fireworks', e('op_7', 0.2), -14),
        # лотерея: билет-переворот, ответ — фанфары, барабан с шарами, шар выкатывается, монеты сыплются, подмигивание
        ('paper_whoosh', S0['lottery'] - 0.1, -4), ('lottery_balls', S0['lottery'] + 0.2, -4), ('medal_fanfare', e('answer'), -6), ('crowd_cheer', e('answer', 0.1), -10), ('lottery_balls', e('lt_lot', -0.3), -2),
        ('wood_bonk', e('lt_lot', 0.1), -10), ('coins_pouch', e('lt_money', -0.3), -2), ('coins_pouch', e('lt_money', 0.1), -6), ('shimmer', e('lt_money', 0.3), -10), ('teleport_pop', e('lt_az'), -6),
        # 2026: подсветка «включается», лупа на плитках, счётчик, население
        ('neon_off', S0['today'] - 0.1, -12), ('shimmer', S0['today'] + 0.1, -8), ('ferry_horn', S0['today'] + 0.4, -10), ('whip_whoosh', e('td_roof'), -12), ('teleport_pop', e('td_mil'), -6), ('tiny_tuk', e('td_city'), -10), ('metronome_tick', e('td_mil', 0.2), -10), ('tiny_tuk', e('td_55'), -4),
        # кнопка: «да?/нет?», ПОДПИШИСЬ на «Пиши» (кукабарра), подмигивание; после голоса — тишина
        ('whip_whoosh', S0['button'] - 0.2, -12), ('tiny_tuk', e('bt_q'), -8), ('tiny_tuk', e('bt_q', 0.3), -8), ('tiny_tuk', e('bt_opera'), -10), ('teleport_pop', e('endcard'), -4), ('kookaburra_laugh', e('endcard', 0.05), -10), ('paper_whoosh', e('bt_go'), -12),
    ]
    beds = [('gulls_river_loop', 0, S0['tunnel']), ('bush_morning_loop', S0['convicts'], S1['convicts']), ('old_square_loop', S0['gold'], S1['gold']), ('city_loop', S0['bridge'], S1['bridge']),
            ('museum_day_loop', S0['contest'], S1['contest']), ('storm_rain_loop', S0['quit'], S1['quit']), ('feast_loop', S0['open'], S1['open']),
            ('old_square_loop', S0['lottery'], S1['lottery']), ('night_city_loop', S0['today'], DUR), ('port_night_loop', S0['today'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_sydney', music_duck=[(S0['quit'] - 0.1, S1['quit'], -6)])
