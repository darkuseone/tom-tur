"""Звук выпуска 031 — Мадрид: SFX и атмосферы от событий картинки (ev.json). Подпись выпуска — кастаньеты (первый звук глобуса и
звук «ПОДПИШИСЬ»), отмотка — мулета и бык, проносящийся мимо; музыка — music_madrid (румба-фламенко: гитара, пальмас, кахон, кастаньеты).
Тяжёлые эпохи (расстрелы 1808, осада 1936) — музыка приглушена. Одна концовка: после «отмотаем!» тишина."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: кастаньеты, глобус — наезд, приземление, море перечёркнуто, собор, «почему?», мыс
        ('castanets_sting', 0.0, -6), ('time_zoom', e('hk_zoom'), -6), ('whip_whoosh', e('hk_zoom', 0.5), -8), ('wind_gust', e('hk_land', -0.1), -8), ('tiny_tuk', 0.25, -10),
        ('pencil_scribble', e('hk_sea'), -4), ('stamp_thud', e('hk_sea', 0.3), -4), ('church_bell_toll', e('hk_cat'), -12), ('pencil_scribble', e('hk_cat', 0.2), -6),
        ('teleport_pop', e('hk_why'), -6), ('tiny_tuk', e('hk_why', 0.12), -8), ('silk_swish', e('hk_cape'), -4), ('rewind', e('hk_cape', 0.3), -8),
        # отмотка: мулета, бык проносится мимо
        ('spin_whoosh', S0['tunnel'] + 0.1, -3), ('silk_swish', S0['tunnel'] + 0.3, -6), ('bull_charge', S0['tunnel'] + 0.45, -2), ('crowd_cheer', S0['tunnel'] + 0.9, -14), ('whip_whoosh', S1['tunnel'] - 0.2, -4),
        # 9 млн лет: глава, саблезуб, прыжок, застрял в болоте
        ('stamp_thud', S0['saber'] + 0.3, -8), ('big_cat_roar', e('sb_cat'), -4), ('whip_whoosh', e('sb_jump'), -6), ('boulder_drop', e('sb_jump', 0.35), -8), ('bubbles_burst', e('sb_stuck'), -6), ('heavy_water_loop', e('sb_stuck', 0.1), -12),
        # 865: крепость строится, имя, вода — каналы, «Мадрид»
        ('dust_whoosh', S0['mayrit'] - 0.1, -6), ('masons_loop', e('my_build'), -10), ('hammer_stakes', e('my_build', 0.2), -6), ('scroll_unroll', e('my_name', -0.1), -6), ('oud_gliss', e('my_name', 0.1), -10),
        ('dive_splash', e('my_water'), -10), ('heavy_water_loop', e('my_water', 0.1), -12), ('tiny_tuk', e('my_madrid'), -4), ('shimmer', e('my_madrid', 0.1), -10),
        # 1561: глава, центр карты, король, двор переезжает, карта — стрелки
        ('paper_whoosh', S0['court'] - 0.1, -6), ('stamp_thud', S0['court'] + 0.3, -8), ('nav_ding', e('ct_cent'), -8), ('war_horn', e('ct_king'), -10), ('horses_gallop', e('ct_court'), -8), ('paper_whoosh', e('ct_map', -0.1), -6), ('pencil_scribble', e('ct_map', 0.2), -8),
        # 1764: дворец, 3418 комнат, король, другие дворцы
        ('palace_gate_slam', S0['palace'] - 0.05, -6), ('rivets_steel', e('pl_built'), -10), ('chisel_strike', e('pl_built', 0.2), -8), ('lottery_balls', e('pl_rooms'), -10), ('metronome_tick', e('pl_rooms', 0.2), -8),
        ('medal_fanfare', e('pl_king'), -10), ('goblet_clink', e('pl_other'), -8),
        # 1808: Наполеон входит, восстание, расстрелы (без кадра), Гойя пишет
        ('drum_march', S0['goya'] - 0.1, -8), ('marching_boots', e('gy_up'), -8), ('crowd_cheer', e('gy_nap'), -14), ('musket_volley', e('gy_exec'), -6), ('brush_stroke', e('gy_goya'), -4), ('brush_stroke', e('gy_goya', 0.4), -6),
        # 1936: сирена, глава, кольцо осады, «держится», годы
        ('air_raid_siren', S0['siege'] - 0.1, -10), ('stamp_thud', S0['siege'] + 0.3, -8), ('tiny_tuk', e('sg_36'), -6), ('cannon_boom', e('sg_ring'), -10), ('collapse_rumble', e('sg_ring', 0.3), -12),
        ('weight_slam', e('sg_hold'), -8), ('clock_tick_heavy', e('sg_years'), -8),
        # Альмудена: колокол, столица без собора, 1993, 110 лет
        ('church_bell_toll', S0['cathedral'] + 0.1, -10), ('stone_saw', e('ct_cap'), -10), ('tiny_tuk', e('ct_93'), -4), ('stamp_thud', e('ct_110'), -4), ('shimmer', e('ct_110', 0.1), -10),
        # ответ: км 0, указ не найден, плашка-ответ, соперники на карте
        ('castanets_sting', S0['today'] - 0.1, -12), ('tiny_tuk', e('td_why'), -6), ('paper_whoosh', e('td_decree', -0.1), -6), ('stamp_thud', e('td_decree', 0.3), -4),
        ('medal_fanfare', e('answer'), -8), ('whip_whoosh', e('answer', 0.2), -8), ('pencil_scribble', e('td_rival'), -6), ('tiny_tuk', e('td_rival', 0.3), -6),
        # кнопка: «где?», ПОДПИШИСЬ на «Пиши» (кастаньеты); после голоса — тишина
        ('whip_whoosh', S0['button'] - 0.2, -12), ('teleport_pop', e('portal'), -10), ('tiny_tuk', e('bt_where'), -6), ('teleport_pop', e('endcard'), -4), ('castanets_sting', e('endcard', 0.05), -10),
    ]
    beds = [('steppe_wind_loop', 0, S0['tunnel']), ('city_loop', E['hk_land'], S0['tunnel']), ('jungle_loop', S0['saber'], S1['saber']), ('cave_drip_loop', S0['saber'], S1['saber']),
            ('bazaar_loop', S0['mayrit'], S1['mayrit']), ('old_square_loop', S0['court'], S1['court']), ('palace_court_loop', S0['palace'], S1['palace']),
            ('street_1770_loop', S0['goya'], S1['goya']), ('city_fire_loop', E['gy_exec'], S1['goya']), ('occupation_night_loop', S0['siege'], S1['siege']),
            ('masons_loop', S0['cathedral'], S1['cathedral']), ('city_loop', S0['today'], DUR), ('feast_loop', S0['today'], S1['today'])]
    return dict(sfx=sfx, beds=beds, music='music_madrid', music_duck=[(S0['goya'] - 0.1, S1['goya'], -6), (S0['siege'] - 0.1, S1['siege'], -7)])
