"""Звук выпуска 030 — Рио-де-Жанейро: SFX и атмосферы от событий картинки (ev.json). Подпись выпуска — куика (первый звук глобуса и
звук «ПОДПИШИСЬ»), отмотка — удар по мячу «через себя»; музыка — music_rio (кавакиньо, гитара, сурдо, пандейру). Тяжёлая эпоха
(Валонго) — музыка приглушена, тихо и после Мараканы. Одна концовка: после «отмотаем!» тишина."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: куика, глобус — наезд, облака, печать «НЕТ», «?», «РИО!», мяч
        ('cuica_sting', 0.0, -6), ('time_zoom', e('hk_zoom'), -6), ('whip_whoosh', e('hk_zoom', 0.5), -8), ('wind_gust', e('hk_land', -0.1), -8), ('tiny_tuk', 0.25, -10),
        ('stamp_thud', e('hk_no'), -2), ('tiny_tuk', e('hk_why'), -4), ('teleport_pop', e('hk_think'), -8), ('teleport_pop', e('hk_think', 0.12), -10), ('ball_kick', e('hk_ball', 0.1), 0), ('rewind', e('hk_ball', 0.3), -8),
        # отмотка: удар через себя, мяч в камеру
        ('spin_whoosh', S0['tunnel'] + 0.1, -3), ('crowd_cheer', S0['tunnel'] + 0.3, -12), ('ball_kick', S0['tunnel'] + 0.8, 0), ('whip_whoosh', S1['tunnel'] - 0.2, -4),
        # 560 млн лет: стекло-кадр бьётся, глава, гул земли, рост купола, табличка
        ('ice_shatter', S0['rock'] - 0.05, -6), ('stamp_thud', S0['rock'] + 0.3, -8), ('magma_bubble_loop', e('rk_old'), -10), ('tectonic_split', e('rk_grow'), -2), ('collapse_rumble', e('rk_grow', 0.3), -8), ('tiny_tuk', e('rk_name'), -4), ('wood_bonk', e('rk_late'), -4),
        # 1502: парус, листок «январь», каравелла, карта, перечёркивание, подзорная труба
        ('sail_flap', S0['river'] - 0.1, -4), ('paper_whoosh', e('rv_jan'), -6), ('ship_bell', e('rv_port'), -8), ('scroll_unroll', e('rv_bay', -0.1), -6), ('pencil_scribble', e('rv_bay', 0.1), -8), ('pencil_scribble', e('rv_no'), -4), ('tiny_tuk', e('rv_no', 0.15), -6),
        # 1555–1565: пушечный дым, карта — форт, стрелки португальцев, звезда «1565», стройка
        ('cannon_boom', S0['french'] - 0.1, -8), ('stamp_thud', e('fr_fr'), -4), ('war_horn', e('fr_out'), -8), ('cannon_boom', e('fr_out', 0.3), -10), ('shimmer', e('fr_found', -0.3), -8), ('hammer_stakes', e('fr_found', 0.2), -4),
        # 1763: золотой песок, глава, мулы, самородок, карта — стрелки
        ('dust_whoosh', S0['gold'] - 0.1, -6), ('stamp_thud', S0['gold'] + 0.3, -8), ('horse_neigh', e('gd_mount'), -10), ('coins_pouch', e('gd_gold'), -4), ('shimmer', e('gd_gold', 0.1), -8), ('paper_whoosh', e('gd_cap', -0.35), -6), ('tiny_tuk', e('gd_cap'), -6), ('stamp_thud', e('gd_cap', 0.4), -6),
        # 1808: корона катится, карта — Наполеон, флот, салют и толпа
        ('coins_pouch', S0['king'] - 0.1, -8), ('drum_march', e('kg_nap'), -8), ('cannon_boom', e('kg_port'), -12), ('ship_bell', e('kg_flee'), -6), ('sail_flap', e('kg_flee', 0.3), -8), ('wind_gust', e('kg_rio', -0.1), -10), ('fireworks', e('kg_emp'), -6), ('crowd_cheer', e('kg_emp', 0.1), -8),
        # Валонго: волна, порт, карта — стрелки, цепи
        ('heavy_water_loop', S0['valongo'] - 0.1, -8), ('chain_clank', e('vl_port'), -8), ('ship_bell', e('vl_port', 0.4), -12), ('paper_whoosh', e('vl_num'), -8), ('clock_tick_heavy', e('vl_num', 0.3), -10), ('chain_clank', e('vl_afr'), -10),
        # 1931: облако, глава, леса падают, линейка растёт, ящик открывается
        ('wind_gust', S0['christ'] - 0.1, -8), ('stamp_thud', S0['christ'] + 0.3, -8), ('collapse_rumble', e('ch_up'), -8), ('shimmer', e('ch_up', 0.2), -6), ('metronome_tick', e('ch_30'), -6), ('gate_creak', e('ch_head'), -6), ('wood_bonk', e('ch_fr'), -6),
        # 1950: сетка, рёв трибун, счётчик, гол, тишина, свисток
        ('whip_whoosh', S0['maracana'] - 0.1, -6), ('crowd_cheer', e('mr_stad'), -4), ('metronome_tick', e('mr_200'), -8), ('ball_kick', e('mr_lose', -0.5), -2), ('stadium_groan', e('mr_lose'), 0), ('police_whistle', e('mr_fin'), -8),
        # ответ: мяч-переход, шкала 197 лет, карта — Бразилиа
        ('ball_kick', S0['today'] - 0.1, -6), ('medal_fanfare', e('answer'), -8), ('metronome_tick', e('answer', 0.3), -8), ('tiny_tuk', e('td_197'), -4), ('whip_whoosh', e('td_bras'), -6), ('stamp_thud', e('td_b2'), -4),
        # кнопка: табличка, перечёркивание, ПОДПИШИСЬ на «Пиши» (куика); после голоса — тишина
        ('whip_whoosh', S0['button'] - 0.2, -12), ('teleport_pop', e('portal'), -10), ('tiny_tuk', e('bt_knew'), -6), ('pencil_scribble', e('bt_not'), -6), ('teleport_pop', e('endcard'), -4), ('cuica_sting', e('endcard', 0.05), -10),
    ]
    beds = [('sea_waves_loop', 0, S0['tunnel']), ('gulls_river_loop', E['hk_land'], S0['tunnel']), ('magma_bubble_loop', S0['rock'], S1['rock']), ('steppe_wind_loop', S0['rock'], S1['rock']),
            ('jungle_loop', S0['river'], S1['river']), ('sea_waves_loop', S0['french'], S1['french']), ('street_1770_loop', S0['gold'], S1['gold']), ('palace_court_loop', S0['king'], S1['king']),
            ('port_night_loop', S0['valongo'], S1['valongo']), ('wind_gust', S0['christ'], S1['christ']), ('construction_loop', S0['christ'], S1['christ']), ('old_square_loop', S0['maracana'], S1['maracana']), ('crowd_cheer', S0['maracana'], E['mr_lose']),
            ('night_city_loop', S0['today'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_rio', music_duck=[(S0['valongo'] - 0.1, S1['valongo'], -7), (E['mr_lose'], S1['maracana'], -6)])
