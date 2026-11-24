"""Звук выпуска 033 — Чернобыль: SFX и атмосферы от событий картинки (ev.json). Подпись выпуска — счётчик Гейгера (первый звук глобуса,
отмотка-дозиметр, взрыв, «ПОДПИШИСЬ»), сопилка — на вопросах и драме; музыка — music_chernobyl (сопилка, синт, пульс).
Тяжёлые эпохи (1941, взрыв, дрон) — музыка приглушена, без «весёлых» звуков, без выстрелов. Одна концовка: после «отмотаем!» тишина."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: Гейгер, глобус — наезд, приземление, вопрос туристки, «Мимо!», 15 км, 800 лет, дозиметр
        ('geiger_crackle', 0.0, -6), ('time_zoom', e('hk_zoom'), -6), ('whip_whoosh', e('hk_zoom', 0.5), -8), ('wind_gust', e('hk_land', -0.1), -8), ('nav_ding', e('hk_ask', 0.3), -10),
        ('stamp_thud', e('hk_miss'), -2), ('alarm_buzz', e('hk_miss', 0.05), -14), ('pencil_scribble', e('hk_15'), -8), ('tiny_tuk', e('hk_15', 0.5), -6), ('wood_bonk', e('hk_800'), -4), ('teleport_pop', e('hk_800', 0.1), -8),
        ('switch_clunk', e('hk_go', -0.1), -8), ('geiger_crackle', e('hk_go', 0.1), -8), ('rewind', e('hk_go', 0.4), -10),
        # отмотка: стрелка дозиметра, воронка-циферблат, треск счётчика → вспышка
        ('spin_whoosh', S0['tunnel'] + 0.05, -3), ('geiger_crackle', S0['tunnel'] + 0.2, -2), ('vortex_suck', S0['tunnel'] + 0.4, -8), ('shimmer', S1['tunnel'] - 0.2, -6),
        # 1193: летопись, рог, гончие, кони, полынь
        ('scroll_unroll', e('ch_year', -0.1), -6), ('stamp_thud', S0['chron'] + 0.3, -8), ('war_horn', e('ch_prince'), -10), ('dog_bark', e('ch_prince', 0.4), -10), ('horses_gallop', e('ch_prince', -0.3), -14), ('horse_neigh', e('ch_prince', 0.8), -14),
        ('silk_swish', e('ch_weed', -0.2), -6), ('brush_dust', e('ch_weed', 0.3), -4),
        # 1897 → 1941: полынь смахивает кадр, рынок, гуси, плашка 59 %, свет гаснет, сопилка
        ('silk_swish', S0['shtetl'] - 0.1, -4), ('metronome_tick', e('sh_has'), -8), ('tiny_tuk', e('sh_has', 0.6), -6), ('lantern_whoosh', e('sh_41'), -4), ('neon_off', e('sh_41', 0.1), -8),
        ('sopilka_sting', e('sh_41', 0.3), -10), ('stamp_thud', e('sh_shot'), -10),
        # 1970: бетон заливает кадр, глава, кран, чертёж, блок ложится
        ('molten_pour', S0['build'] - 0.1, -8), ('stamp_thud', S0['build'] + 0.3, -8), ('scroll_unroll', e('bd_70'), -6), ('chain_clank', e('bd_npp', -0.3), -8), ('weight_slam', e('bd_land'), -6), ('tiny_tuk', e('bd_npp', 0.3), -6),
        # 1986: ночь, часы, взрыв, Гейгер, сирена; карта — Москва молчит, облако в Швецию, тревога
        ('switch_clunk', S0['blast'] - 0.05, -8), ('clock_tick_heavy', e('bl_clock'), -6), ('metronome_tick', e('bl_clock', 0.5), -10), ('reactor_blast', e('bl_boom', -0.05), 2), ('collapse_rumble', e('bl_boom', 0.1), -8),
        ('geiger_crackle', e('bl_boom', 0.4), -4), ('siren_curfew', e('bl_boom', 0.9), -16), ('paper_whoosh', e('bl_map', -0.1), -6), ('radio_tune', e('bl_mos'), -10), ('neon_off', e('bl_mos', 0.3), -10),
        ('dust_whoosh', e('bl_swe', -0.1), -8), ('pencil_scribble', e('bl_swe', 0.2), -8), ('alarm_buzz', e('bl_alarm'), -8), ('stamp_thud', e('bl_alarm', 0.3), -8),
        # 27.04.1986: автобус через кадр, глава, мегафон, табло, наклейка «на 3 дня»
        ('convoy_trucks', S0['evac'] - 0.2, -10), ('stamp_thud', S0['evac'] + 0.3, -8), ('police_whistle', S0['evac'] + 0.8, -14), ('tiny_tuk', e('ev_3h'), -6), ('metronome_tick', e('ev_3h', 0.3), -10),
        ('stamp_thud', e('ev_3d'), -2), ('sopilka_sting', e('ev_3d', 0.3), -12),
        # 2016: счётчик дней, рычаг, арка едет, лязг
        ('paper_whoosh', S0['arch'] - 0.1, -8), ('metronome_tick', e('ar_days'), -8), ('clock_tick_heavy', e('ar_40'), -8), ('lottery_balls', e('ar_40', 0.2), -12), ('switch_clunk', e('ar_arch', -0.1), -4),
        ('rivets_steel', e('ar_arch', 0.2), -10), ('chain_clank', e('ar_arch', 0.4), -10), ('safe_door_slam', e('ar_lock'), -6), ('tiny_tuk', e('ar_100'), -4),
        # 2025: дым, ночь, дрон, удар, огонь, сирена, дозиметр
        ('dust_whoosh', S0['drone'] - 0.1, -6), ('tiny_tuk', S0['drone'] + 0.3, -8), ('drone_buzz', e('dr_fly', -0.2), -4), ('reactor_blast', e('dr_hit', -0.05), -4), ('collapse_rumble', e('dr_hit', 0.1), -10),
        ('siren_curfew', e('dr_hit', 0.4), -16), ('geiger_crackle', e('dr_hit', 0.5), -12),
        # сегодня: ответ, карта района, имя перелетает, полынь к стеле, сопилка
        ('wind_gust', S0['today'] - 0.1, -8), ('gavel_bang', e('answer'), -4), ('scroll_unroll', e('answer', 0.05), -8), ('paper_whoosh', e('td_name'), -6), ('teleport_pop', e('td_name', 0.8), -8),
        ('horse_neigh', S0['today'] + 1.0, -16), ('silk_swish', e('td_grief'), -8), ('sopilka_sting', e('td_grief', 0.2), -10),
        # кнопка: телефон, «ПОДПИШИСЬ» на «Пиши» (Гейгер — подпись); после голоса — тишина
        ('whip_whoosh', S0['button'] - 0.2, -12), ('teleport_pop', e('bt_send'), -8), ('nav_ding', e('bt_send', 0.3), -8), ('teleport_pop', e('endcard'), -4), ('geiger_crackle', e('endcard', 0.05), -8),
    ]
    beds = [('polesie_birds_loop', 0, S0['tunnel']), ('steppe_wind_loop', E['hk_land'], S0['tunnel']), ('polesie_birds_loop', S0['chron'], S1['chron']), ('gulls_river_loop', S0['chron'], S1['chron']),
            ('bazaar_loop', S0['shtetl'], E['sh_41']), ('occupation_night_loop', S0['shtetl'], S1['shtetl']), ('construction_loop', S0['build'], S1['build']), ('blizzard_loop', S0['build'], S1['build']),
            ('reactor_hum_loop', S0['blast'], S1['blast']), ('city_fire_loop', E['bl_boom'], E['bl_map']), ('city_loop', S0['evac'], S1['evac']), ('construction_loop', S0['arch'], S1['arch']),
            ('night_city_loop', S0['drone'], S1['drone']), ('city_fire_loop', E['dr_hit'], S1['drone']), ('polesie_birds_loop', S0['today'], S1['today']), ('polesie_birds_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_chernobyl', music_duck=[(E['sh_41'], S1['shtetl'], -7), (E['bl_boom'] - 0.1, E['bl_map'], -8), (S0['drone'], S1['drone'], -7)])
